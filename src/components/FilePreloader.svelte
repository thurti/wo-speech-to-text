<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import UiWaitingDots from "./ui/UIWaitingDots.svelte";
  import { trackDownloadProgress } from "@/lib/utils/file";
  import { deleteCachesStartWith, isWorkerAllowed } from "@/lib/utils/worker";
  import UiProgressBar from "./ui/UIProgressBar.svelte";
  import throttle from "lodash/throttle";
  import UiButton from "./ui/UIButton.svelte";

  export let cacheName: string;
  export let cacheVersion: string;
  export let urls: string[];
  export let autoStart = true;
  export let isPreloadingFiles = false;

  const cachedVersion = `${cacheName}-${cacheVersion}`;
  const emit = createEventDispatcher();

  let progressMap = new Map<string, number>();
  let doneMap = new Map<string, boolean>();
  let fileSizeMap = new Map<string, number>();
  let totalFileSize = 0;
  let totalProgress = 0;

  $: if (fileSizeMap.size > 0) {
    totalFileSize = [...fileSizeMap.values()].reduce((a, b) => a + b, 0);
  }

  $: if (totalFileSize > 0 && progressMap.size > 0) {
    totalProgress = [...progressMap.values()].reduce((a, b) => a + b, 0);
  }

  const checkIfAllDone = throttle(() => {
    if (doneMap.size === urls.length) {
      if ([...doneMap.values()].every((value) => value === true)) {
        emit("done");
        isPreloadingFiles = false;
        fileSizeMap.clear();
        progressMap.clear();
        doneMap.clear();
        totalProgress = 0;
      } else {
        isPreloadingFiles = true;
      }
    }
  }, 500);

  function onProgress(loadedBytes: number, fileSize: number, url: string) {
    if (fileSize <= 0) return;

    if (!fileSizeMap.has(url)) {
      fileSizeMap = fileSizeMap.set(url, fileSize);
    }

    progressMap = progressMap.set(url, loadedBytes);

    //use extra check to make sure we don't get stuck at 99%
    doneMap = doneMap.set(url, loadedBytes >= fileSize);
  }

  function onDone(url: string) {
    doneMap = doneMap.set(url, true);
    checkIfAllDone();
  }

  const preloadFiles = async () => {
    try {
      isPreloadingFiles = true;

      if (!(await caches.has(cachedVersion))) {
        // new version so delete old ones first
        await deleteCachesStartWith(cacheName);
      }

      urls.forEach(async (url) => {
        try {
          let response = await fetch(url);
          trackDownloadProgress(response, onProgress, onDone);
        } catch (error) {
          console.warn("could not fetch file", error);
        }
      });
    } catch (error) {
      console.warn("could not preload files", error);
      isPreloadingFiles = false;
      emit("done");
    }
  };

  onMount(async () => {
    if (autoStart) preloadFiles();
  });
</script>

{#if !isPreloadingFiles && !autoStart}
  <UiButton on:click={preloadFiles} size="small" title="Load" />
{:else if totalFileSize > 0}
  <UiProgressBar
    max={totalFileSize}
    value={totalProgress}
    showSparkle={false}
  />
{:else}
  <span class="mr-4">Loading<UiWaitingDots show={true} /></span>
{/if}
