import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import ManageListToggle from "./ManageListToggle.vue";

const sampleShow = {
  id: 1,
  name: "Test Show",
  language: "English",
  genres: [],
  status: "Running",
  premiered: "2020-01-01",
  rating: { average: 8.2 },
  image: { medium: "test.jpg", original: "test.jpg" },
  summary: "Test summary",
};

describe("ManageListToggle.vue", () => {
  it('displays "Add to My List" the show is not added', () => {
    const mockStore = {
      getters: {
        "watchlist/isShowAdded": (id: number) => false,
      },
      dispatch: vi.fn(),
    };

    const wrapper = mount(ManageListToggle, {
      props: { show: sampleShow },
      global: {
        provide: { store: mockStore },
        stubs: {
          BaseButton: false,
          "router-link": { template: "<a><slot /></a>" },
          transition: true,
        },
      },
    });
    expect(wrapper.find("p").text()).toBe("Add to My List");
  });

  it('displays "Remove from My List" when the show is added', () => {
    const mockStore = {
      getters: {
        "watchlist/isShowAdded": (id: number) => true,
      },
      dispatch: vi.fn(),
    };

    const wrapper = mount(ManageListToggle, {
      props: { show: sampleShow },
      global: {
        provide: { store: mockStore },
        stubs: {
          BaseButton: false,
          "router-link": { template: "<a><slot /></a>" },
          transition: true,
        },
      },
    });

    expect(wrapper.find("p").text()).toBe("Remove from My List");
  });

  it('dispatches "watchlist/toggleShowInList" with the show when the button is clicked', async () => {
    const mockDispatch = vi.fn();
    const mockStore = {
      getters: {
        "watchlist/isShowAdded": (id: number) => false,
      },
      dispatch: mockDispatch,
    };

    const wrapper = mount(ManageListToggle, {
      props: { show: sampleShow },
      global: {
        provide: { store: mockStore },
        stubs: {
          BaseButton: false,
          "router-link": { template: "<a><slot /></a>" },
          transition: true,
        },
      },
    });

    const button = wrapper.find("button");
    await button.trigger("click");

    expect(mockDispatch).toHaveBeenCalledWith(
      "watchlist/toggleShowInList",
      sampleShow
    );
  });
});
