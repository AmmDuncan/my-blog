import { getPosts } from "../../api";


export default async function handler(req, res) {
  const posts = await getPosts()
  res.send(posts)
}