import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import Dashboard from "@/views/dashboard/Dashboard.vue";
import type { Show } from "@/types";

const sampleShows: Show[] = [
  {
    id: 1,
    name: "Drama Show",
    language: "English",
    genres: ["Drama"],
    status: "Running",
    premiered: "2020-01-01",
    rating: { average: 8.0 },
    image: { medium: "drama_medium.jpg", original: "drama_original.jpg" },
    summary: "A dramatic story.",
  },
  {
    id: 2,
    name: "Comedy Show",
    language: "English",
    genres: ["Comedy"],
    status: "Ended",
    premiered: "2019-01-01",
    rating: { average: 7.5 },
    image: { medium: "comedy_medium.jpg", original: "comedy_original.jpg" },
    summary: "A hilarious tale.",
  },
];

describe("Dashboard.vue", () => {
  it("renders LoadingSpinner when loading and no shows", () => {
    const mockStore = {
      getters: {
        "shows/isLoading": true,
        "shows/getShows": [],
        "shows/getError": "",
        "watchlist/getMyShows": [],
      },
      dispatch: vi.fn(),
    };
    const mockRouter = { push: vi.fn() };
    const wrapper = mount(Dashboard, {
      global: {
        provide: {
          store: mockStore,
          router: mockRouter,
        },
        stubs: {
          LoadingSpinner: { template: '<div class="loading-spinner-stub" />' },
          Watchlist: { template: '<div class="watchlist-stub" />' },
          BaseButton: {
            template: '<button class="base-button-stub"><slot /></button>',
          },
          CarouselBlock: {
            template: '<div class="carousel-block-stub"><slot /></div>',
          },
          ShowCard: {
            template: '<div class="show-card-stub">{{ name }}</div>',
            props: ["id", "name", "image", "hover"],
          },
          NoResults: {
            template: '<div class="no-results-stub"><slot /></div>',
          },
          "router-link": { template: "<a><slot /></a>" },
        },
      },
    });

    expect(wrapper.find(".loading-spinner-stub").exists()).toBe(true);
  });

  it("renders genre sections and child components when shows are available", () => {
    const mockStore = {
      getters: {
        "shows/isLoading": false,
        "shows/getShows": sampleShows,
        "shows/getError": "",
        "watchlist/getMyShows": [],
      },
      dispatch: vi.fn(),
    };
    const mockRouter = { push: vi.fn() };
    const wrapper = mount(Dashboard, {
      global: {
        provide: {
          store: mockStore,
          router: mockRouter,
        },
        stubs: {
          LoadingSpinner: { template: '<div class="loading-spinner-stub" />' },
          Watchlist: { template: '<div class="watchlist-stub" />' },
          BaseButton: {
            template: '<button class="base-button-stub"><slot /></button>',
          },
          CarouselBlock: {
            template: '<div class="carousel-block-stub"><slot /></div>',
          },
          ShowCard: {
            template: '<div class="show-card-stub">{{ name }}</div>',
            props: ["id", "name", "image", "hover"],
          },
          NoResults: {
            template: '<div class="no-results-stub"><slot /></div>',
          },
          "router-link": { template: "<a><slot /></a>" },
        },
      },
    });

    expect(wrapper.find(".watchlist-stub").exists()).toBe(true);

    const headers = wrapper.findAll("h2");
    expect(headers.length).toBe(5);

    const dramaHeader = headers.find((header) => header.text() === "Drama");
    expect(dramaHeader).toBeDefined();

    const showCards = wrapper.findAll(".show-card-stub");
    const hasDramaShow = showCards.some((card) =>
      card.text().includes("Drama Show")
    );
    expect(hasDramaShow).toBe(true);
  });

  it("renders NoResults when shows are empty and not loading", () => {
    const mockStore = {
      getters: {
        "shows/isLoading": false,
        "shows/getShows": [],
        "shows/getError": "Error fetching shows",
        "watchlist/getMyShows": [],
      },
      dispatch: vi.fn(),
    };
    const mockRouter = { push: vi.fn() };
    const wrapper = mount(Dashboard, {
      global: {
        provide: {
          store: mockStore,
          router: mockRouter,
        },
        stubs: {
          LoadingSpinner: { template: '<div class="loading-spinner-stub" />' },
          Watchlist: { template: '<div class="watchlist-stub" />' },
          BaseButton: {
            template: '<button class="base-button-stub"><slot /></button>',
          },
          CarouselBlock: {
            template: '<div class="carousel-block-stub"><slot /></div>',
          },
          ShowCard: {
            template: '<div class="show-card-stub">{{ name }}</div>',
            props: ["id", "name", "image", "hover"],
          },
          NoResults: {
            template: '<div class="no-results-stub"><slot /></div>',
          },
          "router-link": { template: "<a><slot /></a>" },
        },
      },
    });

    expect(wrapper.find(".no-results-stub").exists()).toBe(true);
    expect(wrapper.find(".no-results-stub").text()).toContain(
      "Shows not found. Error fetching shows, Try Later"
    );
  });
});
