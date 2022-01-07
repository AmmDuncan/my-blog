import Header from "../components/Header/Header";
import Featured from "../components/Featured/Featured";
import Recent from "../components/Recent/Recent";
import { getPosts, getTags } from "../api";
import Head from "next/head";

export default function Home({ featured, posts, categories }) {
  return (
    <>
      <Head>

        <title>Browse Posts | Ammiel Yawson</title>
        <meta name="description" content="Welcome to my space. An open look into insights from my journey." />

        <meta property="og:url" content="https://blog.ammielyawson.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Browse Posts | Ammiel Yawson" />
        <meta property="og:description" content="Welcome to my space. An open look into insights from my journey." />
        <meta property="og:image"
              content="https://blog.ammielyawson.com/assets/images/home-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="blog.ammielyawson.com" />
        <meta property="twitter:url" content="https://blog.ammielyawson.com/" />
        <meta name="twitter:title" content="Browse Posts | Ammiel Yawson" />
        <meta name="twitter:description" content="Welcome to my space. An open look into insights from my journey." />
        <meta name="twitter:image"
              content="https://blog.ammielyawson.com/assets/images/home-image.png" />

        <title>Browse Posts | Ammiel Yawson</title>
      </Head>
      <Header />
      <main>
        <div className="container">
          {featured.length &&
            <>
              <Featured featured={featured} />
              <hr />
            </>
          }
          <Recent posts={posts} categories={categories} />
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const localPosts = await getPosts();
  const featured = localPosts.filter(post => post.featured);
  const categories = await getTags();
  return {
    props: {
      posts: localPosts.slice(0, 10),
      featured,
      categories
    }
  };
}
