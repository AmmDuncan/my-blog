import axios from "axios";

const instance = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL + "/ghost/api/v4/content" });

export const getPostsWithTags = () => {
  const query = new URLSearchParams();
  query.append("key", process.env.NEXT_PUBLIC_CONTENT_API_KEY);
  query.append("include", "tags");
  query.append("limit", "all");

  return instance
    .get(`/posts?${query.toString()}`)
    .then(res => res.data.posts)
};