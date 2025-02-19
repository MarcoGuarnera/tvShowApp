import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import BaseCard from "./BaseCard.vue";

describe("BaseCard.vue", () => {
  it("renders slot content", () => {
    const wrapper = mount(BaseCard, {
      slots: {
        default: "<p>Test Content</p>",
      },
    });

    expect(wrapper.html()).toContain("Test Content");
    expect(wrapper.classes()).toContain("card-wrapper");
  });
});
