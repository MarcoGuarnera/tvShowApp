import { Show } from "@/types";
import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GridCardsBlock from "./GridCardsBlock.vue";

const sampleShows: Show[] = [
  {
    id: 1,
    name: "Show One",
    language: "English",
    genres: [],
    status: "Running",
    premiered: "2021-01-01",
    rating: { average: 8.5 },
    image: { medium: "show1_medium.jpg", original: "show1_original.jpg" },
    summary: "Summary one",
  },
  {
    id: 2,
    name: "Show Two",
    language: "English",
    genres: [],
    status: "Ended",
    premiered: "2019-01-01",
    rating: { average: 7.2 },
    image: { medium: "show2_medium.jpg", original: "show2_original.jpg" },
    summary: "Summary two",
  },
];

const ShowCardStub = {
  props: ["id", "name", "image", "hover"],
  template: `<div class="show-card-stub" @click="$emit('click')">{{ name }}</div>`,
};

describe("GridCardsBlock.vue", () => {
  it("renders one ShowCard per show", () => {
    const wrapper = mount(GridCardsBlock, {
      props: { shows: sampleShows },
      global: {
        stubs: {
          ShowCard: ShowCardStub,
        },
      },
    });

    const cards = wrapper.findAll(".show-card-stub");
    expect(cards.length).toBe(sampleShows.length);

    expect(cards[0].text()).toContain("Show One");
    expect(cards[1].text()).toContain("Show Two");
  });

  it("emits a click event with the correct show when it is clicked", async () => {
    const wrapper = mount(GridCardsBlock, {
      props: { shows: sampleShows },
      global: {
        stubs: {
          ShowCard: ShowCardStub,
        },
      },
    });
    const firstCard = wrapper.findAll(".show-card-stub")[0];
    await firstCard.trigger("click");

    const emitted = wrapper.emitted("click");
    expect(emitted).toBeTruthy();
    expect(emitted?.[0]).toEqual([sampleShows[0]]);
  });
});
