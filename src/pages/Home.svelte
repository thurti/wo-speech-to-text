<script lang="ts">
  import UiContainer from "@/components/ui/UIContainer.svelte";
  import UiFileDrop from "@/components/ui/UIFileDrop.svelte";
  import UiFileList from "@/components/ui/UIFileList.svelte";
  import Settings from "@/components/Settings.svelte";
  import {
    filesReadyForDownload,
    isConverting,
    isDownloadReady,
    isOpen,
    isPreloadingFiles,
    logger,
    selectedFiles,
    selectedFormat,
    selectedSettings,
    configFormats,
    configSettings,
  } from "@/store";
  import FileConverter, {
    cancelAll,
    downloadAll,
  } from "@/components/FileConverter.svelte";
  import ConvertButton from "@/components/ConvertButton.svelte";
  import Header from "@/components/Header.svelte";
  import { config } from "@/config";
  import { fade } from "svelte/transition";
  import UiButton from "@/components/ui/UIButton.svelte";
  import UiFloatingButton from "@/components/ui/UIFloatingButton.svelte";
  import UiFloatingButtonsContainer from "@/components/ui/UIFloatingButtonsContainer.svelte";
  import infoSvg from "@/assets/info.svg?raw";
  import gearSvg from "@/assets/gear.svg?raw";
  import SettingsSummary from "@/components/SettingsSummary.svelte";
  import UiTextOutput from "@/components/ui/UITextOutput.svelte";
  import UiDetails from "@/components/ui/UIDetails.svelte";
  import UiHeading from "@/components/ui/UIHeading.svelte";

  let refConvertButton: HTMLDivElement;

  $: {
    if ($filesReadyForDownload.size <= 0) {
      $isDownloadReady = false;
    }
  }

  const onRemoveFile = (file: File) => {
    $selectedFiles = $selectedFiles.filter((f) => f !== file);
  };

  const onRemoveAll = () => {
    $selectedFiles = [];
  };

  $: if (config.debug) {
    console.table($selectedFiles);
  }
  $: if (config.debug) {
    console.table($selectedFormat);
  }
  $: if (config.debug) {
    console.table($selectedSettings);
  }
</script>

<UiContainer>
  <!-- HEADER -->
  <Header title={config.titleHeader} />

  <!-- FILE UPLOAD -->
  <UiFileDrop
    bind:files={$selectedFiles}
    disabled={$isPreloadingFiles}
    label={config.fileDropLabel}
    multiple={true}
    maxFileSizeMb={config.maxFileSizeMb}
    expandDropzone={!$isOpen}
    accept={config.allowedFormats}
  />

  {#if $isOpen}
    <div class="flow w-full" in:fade={{ duration: 100 }}>
      <!-- FILE LIST -->
      <div class="grid">
        <UiFileList let:file bind:files={$selectedFiles}>
          <FileConverter
            on:remove={() => onRemoveFile(file)}
            {file}
            format={$selectedFormat}
            settings={$selectedSettings}
            {logger}
          />
        </UiFileList>
        {#if $selectedFiles.length > 1 && !$isConverting}
          <UiButton
            class="mr-2 mt-3 w-max justify-self-end"
            title="Remove all"
            size="small"
            on:click={() => onRemoveAll()}>Remove All</UiButton
          >
        {/if}
      </div>

      <!-- SETTINGS -->
      <Settings
        formats={$configFormats}
        settings={$configSettings}
        bind:selectedFormat={$selectedFormat}
        bind:selectedSettings={$selectedSettings}
      />

      <!-- CONVERT BUTTON -->
      <div
        class="flex flex-wrap items-center justify-center gap-3"
        bind:this={refConvertButton}
      >
        <ConvertButton disabled={$selectedFiles.length <= 0} />
        {#if $isDownloadReady && $selectedFiles.length > 0}
          <UiButton
            title="Download all"
            size="large"
            on:click={() => downloadAll(true)}>Download All</UiButton
          >
        {/if}

        {#if $selectedFiles.length <= 0}
          <p
            class="d-block w-full text-center text-sm font-light text-neutral-400"
          >
            Select a file first.
          </p>
        {/if}
      </div>
    </div>
  {/if}

  <UiDetails>
    <span slot="summary">Logs</span>
    <UiTextOutput slot="details" rows={20} value={$logger.join("\n")} />
  </UiDetails>
</UiContainer>

<UiFloatingButtonsContainer hasMenu={true}>
  <UiFloatingButton title="About" href="#/info"
    >{@html infoSvg}</UiFloatingButton
  >

  <UiFloatingButton title="Preferences" href="#/preferences"
    >{@html gearSvg}</UiFloatingButton
  >
</UiFloatingButtonsContainer>
