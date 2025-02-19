import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import ShowCard from "./ShowCard.vue";

describe("ShowCard.vue", () => {
  it("renders provided image src and alt name, and applies hover-enabled class when hover is not false", () => {
    const wrapper = mount(ShowCard, {
      props: {
        name: "Test Show",
        image: "test.jpg",
        id: 1,
        hover: true,
      },
    });

    const img = wrapper.find("img");
    expect(img.exists()).toBe(true);
    expect(img.attributes("src")).toBe("test.jpg");
    expect(img.attributes("alt")).toBe("Test Show");
    expect(img.classes()).toContain("hover-enabled");
  });

  it("falls back to the placeholder image when no image is provided", () => {
    const wrapper = mount(ShowCard, {
      props: {
        name: "Test Show",
        image: undefined,
        id: 2,
        hover: true,
      },
    });

    const img = wrapper.find("img");
    expect(img.attributes("src")).toContain("img-placeholder.png");
  });

  it("does not apply hover-enabled class when hover is false", () => {
    const wrapper = mount(ShowCard, {
      props: {
        name: "Test Show",
        image: "test.jpg",
        id: 3,
        hover: false,
      },
    });

    const img = wrapper.find("img");
    expect(img.classes()).not.toContain("hover-enabled");
  });

  it("emits a click event with the correct id when the image is clicked", async () => {
    const wrapper = mount(ShowCard, {
      props: {
        name: "Test Show",
        image: "test.jpg",
        id: 4,
        hover: true,
      },
    });

    const img = wrapper.find("img");
    await img.trigger("click");
    expect(wrapper.emitted("click")).toBeTruthy();
    expect(wrapper.emitted("click")?.[0]).toEqual([4]);
  });
});
