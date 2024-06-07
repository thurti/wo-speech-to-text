import "@testing-library/jest-dom";
import { cleanup, fireEvent, render, screen } from "@testing-library/svelte";
import UITabsMock from "./UITabsMock.svelte";
import { tick } from "svelte";

describe("ui/UITabs.svelte", () => {
  afterEach(() => cleanup());

  it("mounts", () => {
    const { container } = render(UITabsMock);
    expect(container).toBeTruthy();
  });

  it("renders tab menu", () => {
    render(UITabsMock);
    expect(screen.getByRole("tablist")).toBeTruthy();
    expect(screen.getByRole("tab", { name: "Panel 1" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Panel 2" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Panel 3" })).toBeInTheDocument();
  });

  it("renders tab panels", () => {
    render(UITabsMock);
    expect(
      screen.getByRole("tabpanel", { name: "Panel 1" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("tabpanel", { name: "Panel 2" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("tabpanel", { name: "Panel 3" }),
    ).toBeInTheDocument();
  });

  it("set class current on initial tab", async () => {
    render(UITabsMock, { props: { initialTabId: "panel-3" } });
    expect(screen.getByRole("tab", { name: "Panel 3" })).toHaveClass("current");
  });

  it("sets class hidden on inactive tabs", async () => {
    render(UITabsMock, { props: { initialTabId: "panel-3" } });
    expect(screen.getByRole("tabpanel", { name: "Panel 1" })).toHaveClass(
      "hidden",
    );
    expect(screen.getByRole("tabpanel", { name: "Panel 2" })).toHaveClass(
      "hidden",
    );
    expect(screen.getByRole("tabpanel", { name: "Panel 3" })).not.toHaveClass(
      "hidden",
    );
  });
});
