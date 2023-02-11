//! Dynamically implementing image URLs can be quite a hassle. This approach of using a locally saved file where one imports the locally saved images worked for me.
//! Trying to just add the corresponding urls to a database and then trying to import them inline led to trouble in my case.

const TROPHY_IMAGE_URL = [
  {
    image: "None",
    url: require("../assets/trophyImages/splash.png"),
  },
  {
    image: "FirstPic",
    url: require("../assets/trophyImages/Test.webp"),
  },
  {
    image: "SecondPic",
    url: require("../assets/trophyImages/favicon.png"),
  },
];

export default TROPHY_IMAGE_URL;
