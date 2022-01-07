import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import Featured from "../components/Featured/Featured";
import Recent from "../components/Recent/Recent";
import {getPosts, getTags} from "../api";
import Head from "next/head";

export default function Home({featured, posts, categories}) {
  return (
    <>
      <Head>
        <title>Browse Posts | Ammiel Yawson</title>
      </Head>
      <Header/>
      <main>
        <div className="container">
          {featured.length &&
            <>
              <Featured featured={featured}/>
              <hr/>
            </>
          }
          <Recent posts={posts} categories={categories}/>
        </div>
      </main>
    </>
  )
}

export async function getStaticProps({params}) {
  const localPosts = await getPosts()
  const featured = localPosts.filter(post => post.featured)
  const categories = await getTags()
  return {
    props: {
      posts: localPosts.slice(0, 10),
      featured,
      categories,
    }
  }
}
