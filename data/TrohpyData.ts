//! Dynamically implementing image URLs can be quite a hassle. This approach of using a locally saved file where one imports the locally saved images worked for me.
//! Trying to just add the corresponding urls to a database and then trying to import them inline led to trouble in my case.

const TROPHY_IMAGE_URL = [
  {
    image: "None",
    url: require("../assets/trophyImages/none.webp"),
  },
  {
    image: "Apocalyptic Scene",
    url: require("../assets/trophyImages/apocalyptic-scene.webp"),
  },
  {
    image: "Asian City",
    url: require("../assets/trophyImages/asian-city.webp"),
  },
  {
    image: "City Street",
    url: require("../assets/trophyImages/city-street.webp"),
  },
  {
    image: "Winter Alley",
    url: require("../assets/trophyImages/winter-landscape.webp"),
  },
  {
    image: "Black Hole",
    url: require("../assets/trophyImages/black-hole.webp"),
  },
  {
    image: "Castle In The Distance",
    url: require("../assets/trophyImages/castle-river.webp"),
  },
  {
    image: "Futuristic City",
    url: require("../assets/trophyImages/futuristic-city.webp"),
  },
  {
    image: "City After Dark",
    url: require("../assets/trophyImages/city-dark.webp"),
  },
  {
    image: "Castle On The Mountain",
    url: require("../assets/trophyImages/hogwarts-castle.webp"),
  },
  {
    image: "Biopunk House",
    url: require("../assets/trophyImages/biopunk-house.webp"),
  },
  {
    image: "Inside",
    url: require("../assets/trophyImages/castle-inside.webp"),
  },
  {
    image: "Warhammer 40k Space Marines",
    url: require("../assets/trophyImages/space-marines.webp"),
  },
  {
    image: "Fantasy Villa",
    url: require("../assets/trophyImages/fantasy-castle.webp"),
  },
  {
    image: "Warhammer 40k Space Ships",
    url: require("../assets/trophyImages/warhammer40k-spaceships.webp"),
  },
];

export default TROPHY_IMAGE_URL;
