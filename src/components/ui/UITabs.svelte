<script lang="ts">
  import { setContext } from "svelte";
  import { writable } from "svelte/store";

  export let tabs: { id: any; name: string }[] = [];
  export let initialTabId: any = null;
  export { className as class };

  let className = "";
  const current = setContext("currentTab", writable(initialTabId));

  $: initialId = initialTabId ?? tabs[0]?.id;
  $: current.set(initialId);

  function setCurrentTab(tabId: string) {
    if (tabId === $current) return;

    if (tabId && tabs.find((tab) => tab.id === tabId)) {
      $current = tabId;
    }
  }
</script>

<div class="tab-container {className}">
  <ul role="tablist" class="flex gap-2 justify-center mb-6">
    {#each tabs as tab}
      <li>
        <button
          on:click={() => setCurrentTab(tab.id)}
          id={`tab-${tab.id}`}
          class="tab-item unstyled px-1"
          class:current={$current === tab.id}
          role="tab"
          aria-controls={`${tab.id}`}
          aria-selected={$current === tab.id}
        >
          {tab.name}
        </button>
      </li>
    {/each}
  </ul>
  <main>
    <slot />
  </main>
</div>

<style>
  ul {
    list-style-type: none;
  }

  .tab-item {
    border-bottom: 3px solid transparent;
    transition: border-color 0.2s;
  }

  .current,
  .current:hover,
  .tab-item:hover {
    @apply font-semibold;
    border-bottom: 3px solid var(--theme-btn-color);
  }
</style>
