import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import BaseButton from "./BaseButton.vue";

describe("BaseButton.vue", () => {
  it("renders a button when link prop is false and mode is flat (shows ArrowIcon)", () => {
    const wrapper = mount(BaseButton, {
      props: { mode: "flat" },
      slots: { default: "Test Button" },
      attrs: { class: "custom-class" },
      global: {
        stubs: { "router-link": true },
      },
    });

    const button = wrapper.find("button");
    expect(button.exists()).toBe(true);
    expect(button.text()).toContain("Test Button");

    expect(button.classes()).toContain("flat");
    expect(button.classes()).toContain("custom-class");

    const arrowIcon = wrapper.findComponent({ name: "ArrowIcon" });
    expect(arrowIcon.exists()).toBe(true);
  });

  it("renders a router-link when link prop is true and mode is outline (no ArrowIcon)", () => {
    const wrapper = mount(BaseButton, {
      props: { link: true, to: "/test", mode: "outline" },
      slots: { default: "Link Button" },
      global: {
        stubs: {
          "router-link": {
            template: "<a><slot /></a>",
          },
        },
      },
    });

    const link = wrapper.find("a");
    expect(link.exists()).toBe(true);
    expect(link.text()).toContain("Link Button");

    expect(link.classes()).toContain("outline");

    const arrowIcon = wrapper.findComponent({ name: "ArrowIcon" });
    expect(arrowIcon.exists()).toBe(false);
  });

  it("emits a click event when the button is clicked", async () => {
    const wrapper = mount(BaseButton, {
      props: { mode: "flat" },
      slots: { default: "Click Me" },
      global: {
        stubs: { "router-link": true },
      },
    });

    const button = wrapper.find("button");
    await button.trigger("click");
    expect(wrapper.emitted()).toHaveProperty("click");
    const clickEvent = wrapper.emitted("click")?.[0]?.[0];
    expect(clickEvent).toBeInstanceOf(MouseEvent);
  });
});
