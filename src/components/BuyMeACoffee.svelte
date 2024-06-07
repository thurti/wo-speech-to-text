<script lang="ts">
  import { transcribedFilesCount } from "@/store";
  import { tweened } from "svelte/motion";
  import { onMount } from "svelte";
  import UiButton from "./ui/UIButton.svelte";
  import bmac from "@/assets/bmac.png";
  import kofi from "@/assets/kofi.webp";
  import GithubLink from "./GithubLink.svelte";

  const count = tweened(0, {
    duration: $transcribedFilesCount * 10,
    delay: 1000,
  });

  const amIBroke = async () => {
    try {
      const result = await fetch("https://worksoffline.app/am-i-broke.php");
      const text = await result.text();

      if (result.ok) {
        return text;
      } else {
        return "false";
      }
    } catch (error) {
      return "false";
    }
  };

  onMount(() => {
    count.set($transcribedFilesCount);
  });
</script>

<div
  class="relative rounded-lg border border-neutral-100 border-opacity-50 p-6 text-center"
  style="background-color: var(--theme-bg-light-color)"
>
  <p>
    Hey there! 👋 <br />
    I am glad you like my software.

    {#if $transcribedFilesCount > 0}
      <br /> <br />
      If my calculations are correct and you have not
      <span class="font-thin">h4ckZ0rEd</span>
      with dev tools, you've transcribed
      <span
        class="mx-0.5 inline-block rounded-md border-white bg-slate-800 bg-opacity-30 px-2 py-0 pt-0.5"
        style="number-spacing: 0.1em; font-variant-numeric: tabular-nums; font-feature-settings: 'tnum'"
        >{Math.round($count)}</span
      >
      files so far. Not bad&hellip;
    {/if}
  </p>
  <hr class="my-8" />
  <p>
    If you are fortunate enough to be able to donate, please consider donating
    to <i>Sea-Watch e.V.</i>
  </p>
  <UiButton
    as="a"
    href="https://www.betterplace.org/en/projects/36808"
    target="_blank"
    title="Donate to Sea Watch"
    class="mb-2 mt-4"
    size="large"
    highlight={true}
  />

  <p class="mt-4">
    <span class="text-sm">
      Sea-Watch e.V. is a non-profit organization that conducts civil search and
      rescue operations in the Central Mediterranean Sea and provides
      humanitarian aid to those who need it. They are committed to fighting for
      the rights of migrants and refugees and against the dying in the
      Mediterranean.
    </span>
  </p>

  <hr class="mt-8" />

  {#await amIBroke() then broke}
    {#if broke === "true"}
      <div class="mt-6 flex justify-center items-center gap-4 flex-wrap">
        <!-- BUY ME A COFFEE -->
        <a href="https://www.buymeacoffee.com/thurti" target="_blank"
          ><img src={bmac} alt="Buy Me A Coffee" class="h-8" /></a
        >

        <!-- KO-FI -->
        <a href="https://ko-fi.com/thurti" target="_blank"
          ><img src={kofi} alt="Support on Ko-Fi" class="h-8" /></a
        >

        <!-- GITHUB -->
        <UiButton outline size="small"
          ><GithubLink
            url="https://github.com/sponsors/thurti"
            text="Sponsor on Github"
            class="unstyled text-xs h-7"
          /></UiButton
        >
      </div>
    {/if}
  {/await}

  <p class="mt-6">
    If you need a developer you can <a
      href="https://thomashurtig.de"
      target="_blank"
      class="underline"
      title="hire me">hire me as a freelancer</a
    > for your next project.
  </p>
</div>
