<script lang="ts">
  import type { TranscribeResult } from "@transcribe/transcriber";
  import UiButton from "./ui/UIButton.svelte";
  import { resultToText } from "@/lib/utils/result-converter";

  export let result: TranscribeResult | null = null;

  $: text = result ? resultToText(result) : "";

  let h = 0;
  $: btnClass = h > 135 ? "right-7" : "right-1.5";
</script>

<div
  class="mt-4 bg-neutral-100 bg-opacity-10 w-full pt-2.5 pb-1.5 px-2.5 rounded relative"
>
  <UiButton
    on:click={() => navigator.clipboard.writeText(text)}
    class="absolute top-1.5 {btnClass} z-10"
    size="xs"
    outline
    title="Copy to Clipboard">Copy</UiButton
  >
  <p
    bind:clientHeight={h}
    class="text-sm whitespace-pre-wrap pr-16 max-h-32 overflow-auto"
  >
    {text}
  </p>
</div>
