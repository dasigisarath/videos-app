import axios from "axios";

const KEY = "AIzaSyDM3JMzv3vkxZ2bBaG57wIXWd1ZTqgagAk";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    type: "video",
    maxResults: 5,
    key: `${KEY}`,
  },
});
