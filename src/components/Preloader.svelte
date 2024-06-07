<script lang="ts">
  import { isPreloadingFiles } from "@/store";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { isCached, isWorkerAllowed } from "@/lib/utils/worker";
  import { config } from "@/config";
  import UiButton from "./ui/UIButton.svelte";
  import FilePreloader from "./FilePreloader.svelte";
  import { asyncEvery } from "@/lib/utils/utils";

  export let cacheName = "app-cache" as string;
  export let cacheVersion = "1" as string;
  export let urls = [] as string[];
  export let autoStart = true;

  const cachedVersion = `${cacheName}-${cacheVersion}`;
  let showSplash = true;

  onMount(async () => {
    const filesAlreadyCached = await asyncEvery(urls, isCached);

    if (!isWorkerAllowed() || filesAlreadyCached) {
      $isPreloadingFiles = false;
    } else {
      showSplash = false;
    }
  });
</script>

<div
  out:fade={{ duration: 200 }}
  class={`fixed left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center theme-${config.colorScheme} text-current`}
>
  <div class="-translate-y-2/3 text-center">
    {#if showSplash}
      <slot />
    {:else}
      <slot />
      <slot name="message" />

      {#if !autoStart}
        <p class="text-center my-8">
          <UiButton on:click={() => (autoStart = true)} size="large"
            >Launch App</UiButton
          >
        </p>
      {:else}
        <FilePreloader
          {cacheName}
          {cacheVersion}
          {urls}
          bind:isPreloadingFiles={$isPreloadingFiles}
        />
      {/if}
    {/if}
  </div>
</div>
