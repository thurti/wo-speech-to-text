<script lang="ts">
  import type { UIInputItem } from "@/types/UIInputItem";
  import UiInputSelect from "./ui/UIInputSelect.svelte";

  export let id: string;
  export let label: string;
  export let options: UIInputItem[] = [];
  export let value: UIInputItem | string | number | boolean | null;

  const navigatorLangs = navigator.languages.map((lang) => {
    return lang.split("-")[0];
  });

  const preferedLanguages = options.filter((option) => {
    return navigatorLangs.includes(option.value);
  });

  const listOptions = [...options];
  const autoIdx = listOptions.findIndex((option) => option.value === "auto");
  const auto = autoIdx !== -1 ? listOptions.splice(autoIdx, 1)[0] : null;
</script>

<UiInputSelect
  {id}
  {label}
  bind:value
  class="justify-center items-center !flex-row"
>
  {#if auto}
    <option id={auto.id} value={auto.value} disabled={auto.disabled}
      >{auto.label}</option
    >
    <hr />
  {/if}
  {#if preferedLanguages.length > 0}
    <optgroup label="Prefered">
      {#each preferedLanguages as option}
        <option id={option.id} value={option.value} disabled={option.disabled}
          >{option.label}</option
        >
      {/each}
    </optgroup>
    <hr />
  {/if}
  <optgroup label="Available Languages">
    {#each listOptions as option}
      <option id={option.id} value={option.value} disabled={option.disabled}
        >{option.label}</option
      >
    {/each}
  </optgroup>
</UiInputSelect>
