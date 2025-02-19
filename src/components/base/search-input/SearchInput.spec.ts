import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import SearchInput from "./SearchInput.vue";

describe("SearchInput.vue", () => {
  it("renders an input with the default placeholder when none is provided", () => {
    const wrapper = mount(SearchInput);
    const input = wrapper.find("input.search-input");
    expect(input.exists()).toBe(true);
    expect(input.attributes("placeholder")).toBe("Search...");
  });

  it("renders an input with a provided placeholder", () => {
    const wrapper = mount(SearchInput, {
      props: { placeholder: "Type here..." },
    });
    const input = wrapper.find("input.search-input");
    expect(input.attributes("placeholder")).toBe("Type here...");
  });

  it("updates the input value when typing (v-model binding)", async () => {
    const wrapper = mount(SearchInput);
    const input = wrapper.find("input.search-input");
    await input.setValue("Hello World");
    expect((input.element as HTMLInputElement).value).toBe("Hello World");
  });
});
