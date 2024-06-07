<script lang="ts">
  import UiEnableNotifications from "@/components/ui/UIEnableNotifications.svelte";
  import UiInputCheckbox from "@/components/ui/UIInputCheckbox.svelte";
  import UiSection from "@/components/ui/UISection.svelte";
  import {
    badgeOnConversionReady,
    notifyOnConversionReady,
    preferedColorScheme,
    selectedSettings,
  } from "@/store";
  import PageContainer from "./PageContainer.svelte";
  import UiInputSelect from "@/components/ui/UIInputSelect.svelte";
  import { config } from "@/config";
  import ModelSelector from "@/components/ModelSelector.svelte";

  const isBadgeSupported = "setAppBadge" in navigator;
  const cacheName = "wo-transcribe-models";
  const cacheVersion = import.meta.env.VITE_MODELS_VERSION;
</script>

<PageContainer title="Preferences">
  <UiSection>
    <slot slot="heading">General</slot>
    <form class="space-y-4">
      <UiInputSelect
        id="prefersTheme"
        label="Color Scheme"
        bind:value={$preferedColorScheme}
      >
        <option value="auto">Auto</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </UiInputSelect>
    </form>
  </UiSection>
  <UiSection>
    <slot slot="heading">Transcriber</slot>
    <form class="space-y-8">
      <UiInputSelect
        id="transcribeThreads"
        label="Threads"
        bind:value={$selectedSettings.threads}
        options={config.settings.threads.options}
      />
    </form>
  </UiSection>
  <UiSection>
    <slot slot="heading">Model File</slot>
    <p class="text-sm">
      Larger filesize means more memory and cpu usage but propably leads to
      better results. So best is to start with the smallest and only use larger
      models if the transcription results are not good enough.
    </p>

    <p class="text-sm">
      The model files will be stored in the browser cache storage.
    </p>
    <ModelSelector
      {cacheName}
      {cacheVersion}
      bind:selected={$selectedSettings.model}
      models={config.settings.model.options}
    />
  </UiSection>
  <UiSection>
    <slot slot="heading">Notifications</slot>
    <form class="space-y-4">
      <UiEnableNotifications
        bind:checked={$notifyOnConversionReady}
        label="Notify me when the conversion is completed."
      />
      <div>
        <UiInputCheckbox
          label="Show number of completed files in badge."
          disabled={!isBadgeSupported}
          bind:checked={$badgeOnConversionReady}
        />
        {#if !isBadgeSupported}
          <p class="text-sm italic">
            This feature is not supported by your browser.
          </p>
        {/if}
      </div>
    </form>
  </UiSection>
</PageContainer>
