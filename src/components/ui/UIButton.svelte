<script context="module" lang="ts">
  export type IUIButton = {
    as?: "button" | "label" | "a";
    title?: string;
    labelFor?: string;
    type?: "button" | "submit" | "reset";
    outline?: boolean;
    site?: "xs" | "small" | "normal" | "large";
    disabled?: boolean;
    isWaiting?: boolean;
    highlight?: boolean;
    href?: string | null;
    target?: "_self" | "_blank" | "_parent";
    class?: string;
  };
</script>

<script lang="ts">
  import UiWaitingDots from "./UIWaitingDots.svelte";

  export let as: "button" | "label" | "a" = "button";
  export let title: string = "";
  export let labelFor: string = "";
  export let type: "button" | "submit" | "reset" = "button";
  export let outline: boolean = false;
  export let size: "xs" | "small" | "normal" | "large" = "normal";
  export let disabled: boolean = false;
  export let isWaiting: boolean = false;
  export let highlight: boolean = false;
  export let href: string | null = null;
  export let target: "_self" | "_blank" | "_parent" = "_self";

  let className: string = "";
  export { className as class };

  const roles = {
    a: "link",
    button: "button",
    label: "label",
  };
</script>

<svelte:element
  this={as}
  on:click
  role={roles[as]}
  class={`button unstyled inline-block h-max select-none whitespace-nowrap rounded-full border bg-opacity-30 text-center shadow-sm transition-colors focus-within:ring hover:cursor-pointer disabled:cursor-not-allowed disabled:bg-opacity-20 disabled:text-gray-300 ${size} ${className} text-white`}
  style="background-color: var(--theme-btn-color);border-color: var(--theme-btn-color-dark);"
  {href}
  target={as === "a" ? target : null}
  title={title || null}
  {disabled}
  {type}
  for={as === "label" ? labelFor : null}
  class:outlined={outline}
  class:highlight
  class:!cursor-wait={isWaiting}
  class:disabled
  class:isLink={href}
>
  <slot>{title}</slot><UiWaitingDots show={isWaiting} />
</svelte:element>

<style>
  .button:not(.disabled):active {
    transform: scale(0.95);
    @apply outline-none ring-0;
  }

  .button:not(.disabled):hover {
    filter: contrast(1.2);
  }

  .xs {
    @apply px-3;
    @apply text-xs;
    padding-top: 0.25rem;
    padding-bottom: 0.14rem;
  }

  .small {
    @apply px-4;
    @apply text-sm;
    padding-top: 0.25rem;
    padding-bottom: 0.14rem;
  }

  .normal {
    @apply px-6;
    @apply pb-0.5;
    @apply pt-1;
  }

  .large {
    @apply px-8;
    @apply pt-2;
    @apply pb-1.5;
  }

  .outlined {
    color: var(--theme-font-color);
    transition:
      background-color 0.2s,
      color 0.2s;
    background-color: var(--theme-bg-color) !important;
    border-color: rgba(var(--theme-border-color), 0.5) !important;
  }
  .outlined:not(.disabled):hover {
    border-color: rgba(var(--theme-border-color), 0.5) !important;
  }

  .highlight {
    border-color: transparent !important;
    @apply bg-opacity-100 bg-gradient-to-r from-purple-600 to-pink-600 shadow-md;
  }

  .highlight:not(.disabled):hover {
    filter: contrast(1.2);
  }

  .disabled {
    filter: saturate(0.75) !important;
    @apply opacity-70;
  }

  .disabled:hover {
    cursor: not-allowed;
  }

  .isLink:hover {
    text-decoration: none !important;
  }
</style>
