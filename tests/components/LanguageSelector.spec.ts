import "@testing-library/jest-dom";
import { render, cleanup, screen, fireEvent } from "@testing-library/svelte";
import { html } from "@playpilot/svelte-htm";
import LanguageSelector from "@/components/LanguageSelector.svelte";
import { get, writable } from "svelte/store";
import userEvent from "@testing-library/user-event";

const options = [
  { id: "en", label: "English", value: "en" },
  { id: "es", label: "Spanish", value: "es" },
  { id: "fr", label: "French", value: "fr" },
  { id: "auto", label: "Auto", value: "auto", disabled: false },
  { id: "de", label: "German", value: "de" },
];

describe("LanguageSelector", () => {
  afterEach(() => {
    cleanup();
  });

  const user = userEvent.setup();
  vi.stubGlobal("navigator", { languages: ["de-DE"] });

  it("should render correctly", () => {
    render(
      html`<${LanguageSelector}
        id="my-id"
        label="My Heading"
        options=${options}
      />`,
    );

    expect(screen.getByLabelText("My Heading")).toBeInTheDocument();
    expect(screen.getByText("English")).toHaveValue("en");
    expect(screen.getByText("Spanish")).toHaveValue("es");
    expect(screen.getByText("French")).toHaveValue("fr");
  });

  it("it selects if selected has a default", () => {
    render(html`<${LanguageSelector} options=${options} value="es" />`);
    expect((screen.getByText("Spanish") as HTMLOptionElement).selected).toBe(
      true,
    );
  });

  it("it binds to value", async () => {
    const selected = writable(null);
    render(
      html`<${LanguageSelector}
        id="my-id"
        label="Select a language"
        options=${options}
        bind:value=${selected}
      />`,
    );

    await user.selectOptions(
      screen.getByLabelText("Select a language"),
      "Spanish",
    );

    expect(get(selected)).toEqual("es");
  });

  it("renders disabled if disabled", () => {
    options[3].disabled = true;

    render(
      html`<${LanguageSelector}
        id="my-id"
        label="Select a language"
        options=${options}
      />`,
    );

    expect(screen.getByText("Auto")).toBeDisabled();
    options[3].disabled = false;
  });

  it("shows auto on top if present", () => {
    render(
      html`<${LanguageSelector}
        id="my-id"
        label="Select a language"
        options=${options}
      />`,
    );

    const elements = screen.getAllByRole("option");
    expect(elements[0]).toHaveValue("auto");
  });

  it("shows navigator prefered langs on top if present", () => {
    render(
      html`<${LanguageSelector}
        id="my-id"
        label="Select a language"
        options=${options}
      />`,
    );

    const elements = screen.getAllByRole("option");
    expect(elements[0]).toHaveValue("auto");
    expect(elements[1]).toHaveValue("de");
  });
});
