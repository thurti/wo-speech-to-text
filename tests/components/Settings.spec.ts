import "@testing-library/jest-dom";
import { render, cleanup, screen } from "@testing-library/svelte";
import { html } from "@playpilot/svelte-htm";
import Settings from "@/components/Settings.svelte";
import userEvent from "@testing-library/user-event";
import { get, writable } from "svelte/store";

const formats = {
  id: "format",
  label: "Format",
  value: "format",
  options: [
    {
      id: "txt",
      label: "Plain Text (txt)",
      value: "txt",
      ext: "txt",
      mimetype: "text/plain",
      isDefault: true,
    },
    {
      id: "csv",
      label: "CSV",
      value: "csv",
      ext: "csv",
      mimetype: "application/csv",
    },
  ],
};

const settings = {
  suppress_non_speech: {
    id: "suppress_non_speech",
    label: "Ignore Non Speech",
    value: false,
  },
  lang: {
    id: "lang",
    label: "Input Language",
    options: [
      {
        id: "auto",
        label: "Auto (slow)",
        value: "auto",
        isDefault: true,
      },
      {
        id: "ar",
        value: "ar",
        label: "Arabic",
      },
    ],
  },
};

const selectedFormat = {
  id: "txt",
  label: "Plain Text (txt)",
  value: "txt",
  ext: "txt",
  mimetype: "text/plain",
  isDefault: true,
};

const selectedSettings = {
  suppress_non_speech: true,
  lang: "auto",
};

describe("Settings", () => {
  afterEach(() => cleanup());

  const user = userEvent.setup();

  it("should render correctly", async () => {
    render(
      html`<${Settings}
        formats=${formats}
        settings=${settings}
        selectedFormat=${selectedFormat}
        selectedSettings=${selectedSettings}
      />`,
    );

    expect(screen.getByLabelText("Input Language")).toBeInTheDocument();
    expect(
      (screen.getByText("Auto (slow)") as HTMLOptionElement).selected,
    ).toBe(true);
    expect(screen.getByLabelText("Ignore Non Speech")).toBeChecked();

    expect(screen.getByLabelText("Plain Text (txt)")).toBeChecked();
    expect(screen.getByLabelText("CSV")).not.toBeChecked();
  });

  it("should update selectedFormat", async () => {
    const selectedFormat = writable({});

    render(
      html`<${Settings}
        formats=${formats}
        settings=${settings}
        bind:selectedFormat=${selectedFormat}
        selectedSettings=${selectedSettings}
      />`,
    );

    expect(screen.getByLabelText("CSV")).not.toBeChecked();
    await user.click(screen.getByLabelText("CSV"));

    expect(screen.getByLabelText("CSV")).toBeChecked();
    expect(get(selectedFormat)).toEqual({
      id: "csv",
      label: "CSV",
      value: "csv",
      ext: "csv",
      mimetype: "application/csv",
    });
  });

  it("should update selectedSettings", async () => {
    const selected = writable(selectedSettings);

    render(
      html`<${Settings}
        formats=${formats}
        settings=${settings}
        selectedFormat=${selectedFormat}
        bind:selectedSettings=${selected}
      />`,
    );

    await user.selectOptions(screen.getByLabelText("Input Language"), ["ar"]);
    await user.click(screen.getByLabelText("Ignore Non Speech"));

    expect(get(selected)).toEqual({
      suppress_non_speech: false,
      lang: "ar",
    });
  });
});
