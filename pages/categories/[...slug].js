import { useRouter } from "next/router";
import Head from "next/head";
import { getPosts, getTags } from "../../api";
import classnames from "classnames";
import { formatDistanceToNow } from "date-fns";
import { HorizontalCard } from "../../components/Recent/Recent";

import styles from "../../components/Recent/Recent.module.scss";

export default function SingleCategory({ posts, category, categories, meta }) {
  const router = useRouter();

  if (!posts) return <div className="fill-page" />;

  const lastPage = meta.pagination.page === meta.pagination.pages;
  const firstPage = meta.pagination.page === 1;
  return (
    <>
      <Head>
        <meta name="description" content="Welcome to my space. An open look into insights from my journey." />

        <meta property="og:url" content="https://blog.ammielyawson.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="All Categories | Ammiel Yawson" />
        <meta property="og:description" content="Welcome to my space. An open look into insights from my journey." />
        <meta property="og:image"
              content="https://blog.ammielyawson.com/assets/images/home-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="blog.ammielyawson.com" />
        <meta property="twitter:url" content="https://blog.ammielyawson.com/" />
        <meta name="twitter:title" content="All Categories | Ammiel Yawson" />
        <meta name="twitter:description" content="Welcome to my space. An open look into insights from my journey." />
        <meta name="twitter:image"
              content="https://blog.ammielyawson.com/assets/images/home-image.png" />
        <title>All Categories | Ammiel Yawson</title>
      </Head>
      <div className={classnames("container")}>
        <section className={classnames("section", styles.latest)}>
          <div className={styles["recent"]}>
            <h2>Category: <span className={styles["primary"]}>{category.name}</span></h2>
            <div className={styles["collection"]}>
              {posts.map(post => {
                const { uuid, feature_image, slug, title, created_at, excerpt, primary_tag } = post;
                const resPosts = {
                  title,
                  image: feature_image,
                  date: `${formatDistanceToNow(new Date(created_at))} ago`,
                  body: excerpt,
                  tag: primary_tag.name
                };
                return <HorizontalCard {...resPosts} key={uuid} clicked={() => router.push(`/posts/${slug}`)} />;
              })}

              <div className="pagination">
                <button className="page-btn" disabled={firstPage} onClick={() => {
                  if (!firstPage) router.push(`/${category.slug}/${meta.pagination.page - 1}`);
                }}>
                  <svg width="20" height="20" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M43.0624 10.3188L19.2624 30.8439C18.5812 31.4314 18.5812 32.5627 19.2624 33.1564L43.0624 53.6815C43.9499 54.444 45.2499 53.7565 45.2499 52.5253V11.475C45.2499 10.2438 43.9499 9.55629 43.0624 10.3188Z"
                      fill="#5222D0" />
                  </svg>
                  Prev
                </button>

                <div className="info">
                  Page <strong>{meta.pagination.page} of {meta.pagination.pages}</strong>
                </div>

                <button className="page-btn" disabled={lastPage} onClick={() => {
                  if (!lastPage) router.push(`/${category.slug}/${meta.pagination.page + 1}`);
                }}>
                  Next
                  <svg width="20" height="20" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M20.9376 10.3188L44.7376 30.8439C45.4188 31.4314 45.4188 32.5627 44.7376 33.1564L20.9376 53.6815C20.0501 54.444 18.7501 53.7565 18.7501 52.5253V11.475C18.7501 10.2438 20.0501 9.55629 20.9376 10.3188Z"
                      fill="#5222D0" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <hr className={styles["mob-only"]} />
          <div className={styles["topics"]}>
            <h2>All Categories</h2>
            <ul className={styles["topics-list"]}>
              {categories.map(c => <li key={c.id} onClick={() => router.push(`/categories/${c.slug}`)}>{c.name}</li>)}
            </ul>
          </div>
        </section>
      </div>
    </>
  )
    ;
}

export async function getStaticPaths() {
  const tags = await getTags();
  const paths = [];
  tags.forEach((tag) => {
    getPosts({ filter: `tag:${tag.slug}` })
      .then(posts => {
        const meta = posts.meta;
        const pages = meta.pagination.pages;
        for (let i = 1; i < pages; i++) {
          paths.push({ params: { slug: [tag.slug, i] } });
        }
      }).catch(e => console.log(e));
  });
  return {
    paths,
    fallback: true
  };
}

export async function getStaticProps({ params: { slug } }) {
  let posts, tags, category, meta;
  try {
    const page = (slug.length > 1) ? slug[1] : 1;
    posts = await getPosts({ include: "tags", filter: `tag:${slug[0]}`, page });
    tags = await getTags();
    category = posts[0].primary_tag;
    meta = posts.meta;
  } catch (e) {
    return { notFound: true };
  }

  return {
    props: {
      posts,
      meta,
      category,
      categories: tags
    }
  };
}