<script lang="ts">
  import {
    type ConfigFormatOption,
    type ConfigFormats,
    type ConfigSettingOption,
    type ConfigSettings,
  } from "@/config";
  import Setting from "./Setting.svelte";
  import UiHeading from "./ui/UIHeading.svelte";
  import { type SelectedSettings } from "@/store";
  import UiInputCheckbox from "./ui/UIInputCheckbox.svelte";
  import LanguageSelector from "./LanguageSelector.svelte";

  export let formats: ConfigFormats;
  export let settings: ConfigSettings;
  export let selectedFormat: ConfigFormatOption;
  export let selectedSettings: SelectedSettings;
</script>

<div class="space-y-7">
  <!-- SETTINGS -->
  <div class="text-center">
    <LanguageSelector
      id={settings.lang.id}
      label={settings.lang.label}
      options={settings.lang.options ?? []}
      bind:value={selectedSettings.lang}
    />
    <UiInputCheckbox
      label={settings.suppress_non_speech.label}
      bind:checked={selectedSettings.suppress_non_speech}
      class="justify-center mt-7"
    />
  </div>

  <hr />

  <!-- FORMAT -->
  <Setting
    id={formats.id}
    label={formats.label}
    options={formats.options}
    bind:selected={selectedFormat}
  >
    <UiHeading level={3} id="format" slot="heading" class="mb-6">
      {formats.label}
    </UiHeading>
  </Setting>
</div>
