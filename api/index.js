import GhostContentAPI from "@tryghost/content-api";

const api = new GhostContentAPI({
  url: process.env.API_URL,
  key: process.env.CONTENT_API_KEY,
  version: "v4"
});

export const getPosts = (options = { include: "tags" }) => api.posts.browse({ ...options, include: "tags,authors" });
export const getPost = (options = {}) => api.posts.read(options);
export const getTags = (options = { include: "posts" }) => api.tags.browse({ ...options });
