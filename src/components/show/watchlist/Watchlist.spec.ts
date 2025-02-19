import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Watchlist from "./Watchlist.vue";

const sampleShows = [
  {
    id: 1,
    name: "Show One",
    language: "English",
    genres: [],
    status: "Running",
    premiered: "2021-01-01",
    rating: { average: 8.5 },
    image: { medium: "show1.jpg", original: "show1.jpg" },
    summary: "Summary one",
  },
  {
    id: 2,
    name: "Show Two",
    language: "English",
    genres: [],
    status: "Ended",
    premiered: "2019-01-01",
    rating: { average: 7.5 },
    image: { medium: "show2.jpg", original: "show2.jpg" },
    summary: "Summary two",
  },
];

describe("Watchlist.vue", () => {
  it('renders the header "My Watchlist"', () => {
    const wrapper = mount(Watchlist, {
      props: { myShowsList: [] },
      global: {
        stubs: {
          CarouselBlock: true,
          ShowCard: true,
        },
      },
    });
    expect(wrapper.find("h2").text()).toBe("My Watchlist");
  });

  it("renders empty watchlist message when myShowsList is empty", () => {
    const wrapper = mount(Watchlist, {
      props: { myShowsList: [] },
      global: {
        stubs: {
          CarouselBlock: true,
          ShowCard: true,
        },
      },
    });
    const emptyDiv = wrapper.find(".empty-watchlist");
    expect(emptyDiv.exists()).toBe(true);
    expect(emptyDiv.find("h2").text()).toContain(
      "Add a Show to your Watchlist"
    );
  });

  it("renders CarouselBlock with ShowCards when myShowsList is not empty", () => {
    const wrapper = mount(Watchlist, {
      props: { myShowsList: sampleShows },
      global: {
        stubs: {
          CarouselBlock: {
            template: '<div class="carousel-stub"><slot /></div>',
          },
          ShowCard: {
            props: ["id", "name", "image", "hover"],
            template: '<div class="show-card-stub">{{ name }}</div>',
          },
        },
      },
    });

    const carousel = wrapper.find(".carousel-stub");
    expect(carousel.exists()).toBe(true);

    const showCards = wrapper.findAll(".show-card-stub");
    expect(showCards.length).toBe(sampleShows.length);
    sampleShows.forEach((show, index) => {
      expect(showCards[index].text()).toContain(show.name);
    });
  });

  it("emits a click event with the correct id when an element is clicked", async () => {
    const ShowCardStub = {
      props: ["id", "name", "image", "hover"],
      template: `<div class="show-card-stub" @click="$emit('click', id)">{{ name }}</div>`,
    };

    const wrapper = mount(Watchlist, {
      props: { myShowsList: sampleShows },
      global: {
        stubs: {
          CarouselBlock: {
            template: '<div class="carousel-stub"><slot /></div>',
          },
          ShowCard: ShowCardStub,
        },
      },
    });

    const firstCard = wrapper.find(".show-card-stub");
    await firstCard.trigger("click");

    expect(wrapper.emitted("click")).toBeTruthy();
    expect(wrapper.emitted("click")?.[0]).toEqual([sampleShows[0].id]);
  });
});
