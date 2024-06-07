<script lang="ts">
  import UiTabs from "@/components/ui/UITabs.svelte";
  import UiTabsPanel from "@/components/ui/UITabsPanel.svelte";

  export let initialTabId = "";
  export let restoreHashOnUrlChange = false;

  const tabs = [
    { id: "panel-1", name: "Panel 1" },
    { id: "panel-2", name: "Panel 2" },
    { id: "panel-3", name: "Panel 3" },
  ];
</script>

<UiTabs {tabs} {initialTabId} {restoreHashOnUrlChange}>
  <UiTabsPanel id="panel-1">Content 1</UiTabsPanel>
  <UiTabsPanel id="panel-2">Content 2</UiTabsPanel>
  <UiTabsPanel id="panel-3">Content 3</UiTabsPanel>
</UiTabs>
