import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import NoResultsBlock from "./NoResultsBlock.vue";

describe("NoResultsBlock.vue", () => {
  it("renders slot content and has the correct class", () => {
    const wrapper = mount(NoResultsBlock, {
      slots: {
        default: "No results found",
      },
    });

    expect(wrapper.text()).toContain("No results found");

    expect(wrapper.classes()).toContain("no-results");
  });
});
