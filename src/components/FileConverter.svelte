<script context="module" lang="ts">
  const progress = writable<number>(0);
  let transcriber: FileTranscriber;
  let currentModel: string = "";

  const elements = new Set<{
    convert: () => Promise<void>;
    cancel: () => Promise<void>;
    download: () => void;
    getResult: () => { data: Blob; filename: string };
    getIsConverting: () => boolean;
  }>();

  export const convertAll = async () => {
    // do in sequence because of memory/cpu usage
    for (const el of Array.from(elements)) {
      await el.convert();
    }
  };

  export const cancelAll = async () => {
    return Array.from(elements)
      .find((el) => el.getIsConverting())
      ?.cancel();
  };

  export const downloadAll = async (useNative = false) => {
    if (useNative && "showDirectoryPicker" in window) {
      const results = Array.from(elements).map((el) => el.getResult());

      try {
        await saveAllFiles(results, "downloadAllDir");
      } catch (e) {
        console.warn(e);
      }
    } else {
      Array.from(elements).forEach((el) => {
        el.download();
      });
    }
  };
</script>

<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  import { get, writable } from "svelte/store";
  import UiProgressBar from "./ui/UIProgressBar.svelte";
  import { getOutputFilename, saveAllFiles } from "@/lib/utils/file";
  import UiDownloadData from "./ui/UIDownloadData.svelte";
  import UiWaitingDots from "./ui/UIWaitingDots.svelte";
  import { fade } from "svelte/transition";
  import {
    transcribedFilesCount,
    filesReadyForDownload,
    type Logger,
    type SelectedSettings,
    selectedSettings,
  } from "@/store";
  import type { ConfigFormatOption } from "@/config";
  import UiButton from "./ui/UIButton.svelte";
  import {
    FileTranscriber,
    type TranscribeResult,
  } from "@transcribe/transcriber";
  import createModule from "@transcribe/shout";
  import ResultPreview from "./ResultPreview.svelte";
  import { resultToFormat } from "@/lib/utils/result-converter";
  import { getDtwTypeFromFilename } from "@/lib/utils/utils";

  export let file: File;
  export let format: ConfigFormatOption;
  export let settings: SelectedSettings;
  export let logger: Logger;
  export let showSparkle: boolean = true;

  let result: TranscribeResult | null = null;
  let isLoading: boolean = false;
  let isConverting: boolean = false;
  let isError: boolean = false;
  let errorMessage: string = "";
  let isCanceled: boolean = false;

  const emits = createEventDispatcher();
  currentModel = settings.model;

  $: outputFilename = getOutputFilename(file.name, format);
  $: outputData = result ? resultToFormat(result, format.value) : "";

  $: {
    // reinit if model changed
    if (!isLoading && settings.model !== currentModel) {
      currentModel = settings.model;

      cancelAll().then(async () => {
        transcriber.destroy();
        init(true);
      });
    }
  }

  const init = async (force = false): Promise<void> => {
    // don't reinit if already initialized unless force
    if (!force && transcriber && !isLoading) {
      return;
    }

    isLoading = true;

    const model = `${import.meta.env.VITE_TRANSCRIBE_MODEL_PATH}/${currentModel}`;
    const dtwType = getDtwTypeFromFilename(currentModel);

    transcriber = new FileTranscriber({
      createModule,
      model,
      workerPath: import.meta.env.VITE_TRANSCRIBE_PATH,
      dtwType,
      onProgress: (p) => ($progress = p + 1),
      print: (msg) => logger.log(msg),
      printErr: (msg) => logger.log(msg),
    });

    try {
      await transcriber.init();
    } catch (error) {
      logger.log(error as unknown as string);
      isError = true;
      errorMessage = "Failed to initialize transcriber";
      console.warn(error);
    } finally {
      isLoading = false;
    }
  };

  let waitTimeout: number;
  const waitWhileLoading = async () => {
    while (isLoading) {
      await new Promise(
        (resolve) => (waitTimeout = window.setTimeout(resolve, 200)),
      );
    }
  };

  const convert = async () => {
    isError = false;
    errorMessage = "";
    result = null;
    $progress = 0;

    $filesReadyForDownload.delete(file);
    $filesReadyForDownload = get(filesReadyForDownload);

    await waitWhileLoading();

    try {
      isConverting = true;

      result = await transcriber.transcribe(file, {
        lang: settings.lang,
        threads:
          $selectedSettings.threads === 0
            ? undefined
            : $selectedSettings.threads,
        suppress_non_speech: settings.suppress_non_speech,
      });

      if (result.transcription?.length <= 0) {
        throw new Error("Empty Result");
      }

      // store results global to change output format without retranscribing
      filesReadyForDownload.set($filesReadyForDownload.set(file, result));
    } catch (error) {
      if (!isCanceled) {
        console.warn(error);
        // @ts-expect-error
        errorMessage = error?.message ?? error;
        await transcriber.cancel();
        isError = true;
      }
    } finally {
      if (!isCanceled && !isError) {
        $transcribedFilesCount += 1;
      }
      isConverting = false;
    }
  };

  const cancel = async () => {
    await waitWhileLoading();
    isCanceled = true;
    await transcriber.cancel();
    isConverting = false;
    isError = false;
    errorMessage = "";
    isCanceled = false;
  };

  let downloadLink: HTMLDivElement;

  const download = () => {
    if (downloadLink && result) {
      downloadLink.querySelector("button")?.click();
    }
  };

  const getResult = (): { data: Blob; filename: string } => {
    return {
      data: new Blob([outputData], { type: format.mimetype }),
      filename: outputFilename,
    };
  };

  const getIsConverting = () => isConverting;

  const exports = {
    convert,
    cancel,
    download,
    getResult,
    getIsConverting,
  };

  const onRemoveFile = () => {
    $filesReadyForDownload.delete(file);
    $filesReadyForDownload = get(filesReadyForDownload);
    emits("remove", file);
  };

  onMount(async () => {
    init();
    elements.add(exports);
  });

  function destroy() {
    clearTimeout(waitTimeout);
    isLoading = false;
    elements.delete(exports);
  }

  onDestroy(async () => {
    destroy();
  });
</script>

<div class="flex w-full gap-4 items-center">
  <span class="w-1/3 shrink grow truncate pt-0.5">{file.name}</span>

  <div class="w-1/3 shrink grow text-center">
    {#if outputData && $filesReadyForDownload.has(file)}
      <div bind:this={downloadLink}>
        <UiDownloadData
          data={outputData}
          type={format.mimetype ?? ""}
          filename={outputFilename}
          useNative={true}
          size="small">Download {format.label}</UiDownloadData
        >
      </div>
    {:else}
      {#if isLoading}
        <p class="relative" in:fade={{ duration: 150 }}>
          loading file<UiWaitingDots show={true} />
        </p>
      {:else if isCanceled}
        <p class="relative" in:fade={{ duration: 150 }}>
          cancel<UiWaitingDots show={true} />
        </p>
      {:else if isConverting && !isCanceled}
        {#if $progress <= 0}
          <p class="relative" in:fade={{ duration: 150 }}>
            transcribing<UiWaitingDots show={true} />
          </p>
        {:else}
          <div in:fade={{ duration: 150 }}>
            <UiProgressBar {showSparkle} value={$progress} max={100} />
          </div>
        {/if}
      {/if}

      {#if isError}
        <p
          class="converter-error text-center text-sm"
          in:fade={{ duration: 150 }}
        >
          {#if errorMessage}
            {errorMessage}
          {:else}
            There was an error.
          {/if}
        </p>
      {/if}
    {/if}
  </div>

  <UiButton
    disabled={isConverting || (!result && (isLoading || isCanceled))}
    on:click={() => onRemoveFile()}
    size="small"
    title={`Remove file ${file.name}`}>Remove</UiButton
  >
</div>

{#if result && result.transcription?.length > 0}
  <ResultPreview {result} />
{/if}
