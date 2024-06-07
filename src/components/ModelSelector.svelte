<script lang="ts">
  import type { UIInputItem } from "@/types/UIInputItem";
  import FilePreloader from "./FilePreloader.svelte";
  import { tick } from "svelte";
  import UiWaitingDots from "./ui/UIWaitingDots.svelte";

  export let models: UIInputItem[] = [];
  export let selected: string = "";
  export let cacheName = "app-cache" as string;
  export let cacheVersion = "1" as string;

  const modelPath = import.meta.env.VITE_TRANSCRIBE_MODEL_PATH;

  type Option = { isCached: () => Promise<boolean> } & UIInputItem;
  let options: Option[] = [];

  $: {
    options = models.map(mapModelToOption);
  }

  function mapModelToOption(model: UIInputItem): Option {
    return {
      ...model,
      isCached: async () => {
        const url = `${modelPath}/${model.value}`;
        return (await caches.match(url)) !== undefined;
      },
    };
  }

  let isLoading = false;

  async function onModelLoaded(id: string) {
    isLoading = true;
    const option = options.find((option) => option.id === id);

    while (!(await option?.isCached())) {
      await tick();
    }

    isLoading = false;
    options = [...options];
    selected = id;
  }
</script>

<div
  class="relative file-list theme-border-color-50 w-full overflow-auto rounded-lg border"
>
  {#if isLoading}
    <div
      class="absolute z-10 w-full h-full flex justify-center items-center backdrop-blur-xs"
    >
      <span>Loading<UiWaitingDots show /></span>
    </div>
  {/if}
  <ul>
    {#each options as option}
      <li
        class="theme-border-color-50 flex items-center justify-between gap-x-4 overflow-y-hidden border-b bg-neutral-300 bg-opacity-5 px-2 h-11 last:border-0 odd:bg-opacity-10 hover:bg-opacity-10"
      >
        {#await option.isCached() then isCached}
          {#if !isCached}
            <span class="whitespace-nowrap">{option.label}</span>
            <FilePreloader
              {cacheName}
              {cacheVersion}
              urls={[`${modelPath}/${option.value}`]}
              autoStart={false}
              on:done={() => onModelLoaded(option.id)}
            />
          {:else}
            <label
              class="w-full h-full flex justify-between items-center hover:cursor-pointer"
              >{option.label}
              <input
                class="mr-6 hover:cursor-pointer"
                type="radio"
                name="model"
                id={option.id}
                bind:group={selected}
                value={option.value}
              />
            </label>
          {/if}
        {/await}
      </li>
    {/each}
  </ul>
</div>

<style>
  label:has(:checked) {
    color: var(--theme-btn-color-dark);
    font-weight: 700;
  }

  input[type="radio"] {
    border-color: rgba(var(--theme-border-color), 0.5);
  }

  input[type="radio"]:checked {
    background-color: var(--theme-btn-color);
  }

  input[type="radio"]:focus {
    --tw-ring-color: var(--theme-btn-color);
  }
</style>
