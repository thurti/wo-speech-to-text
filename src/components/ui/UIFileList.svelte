<script lang="ts">
  import { slide } from "svelte/transition";

  export let files: File[] = [];

  const duration = 200;
</script>

<div
  class="file-list theme-border-color-50 w-full overflow-auto rounded-lg border"
>
  <ul>
    {#if files.length <= 0}
      <li
        transition:slide|local={{ duration }}
        class="px-4 py-2 text-center text-neutral-400 font-thin text-sm"
      >
        Please add some files.
      </li>
    {/if}
    {#each Array.from(files) as file (file.name)}
      <li
        transition:slide|local={{ duration }}
        class="theme-border-color-50 flex flex-wrap items-center justify-between gap-x-2 overflow-y-hidden border-b bg-neutral-300 bg-opacity-5 p-2 last:border-0 odd:bg-opacity-10 hover:bg-opacity-10 md:gap-x-4 md:px-4 md:py-4"
      >
        <slot {file} />
      </li>
    {/each}
  </ul>
</div>
