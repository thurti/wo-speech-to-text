<script lang="ts">
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";

  export let id: string;

  const currentTab: Writable<typeof id> = getContext("currentTab");
</script>

<div
  {id}
  role="tabpanel"
  aria-labelledby={`tab-${id}`}
  tabindex="0"
  class:hidden={$currentTab && $currentTab !== id}
>
  <slot {currentTab} />
</div>

<style>
  .hidden {
    display: none;
  }
</style>
