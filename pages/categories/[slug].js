import { useRouter } from "next/router";
import React from "react";

import Navbar from "../../components/Navbar/Navbar";
import { getPosts, getTags } from "../../api";
import classnames from "classnames";
import { formatDistanceToNow } from "date-fns";
import { HorizontalCard } from "../../components/Recent/Recent";

import styles from "../../components/Recent/Recent.module.scss";

export default function SingleCategory({ posts, category, categories }) {
  const router = useRouter();

  if(!posts) return null

  return (
    <>
      <Navbar />
      <div className={classnames("container")}>
        <section className={classnames("section", styles.latest)}>
          <div className={styles["recent"]}>
            <h2>Posts under &quot;<span className={styles["primary"]}>{category}</span>&quot;</h2>
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
  const paths = tags.map(tag => ({ params: { slug: tag.slug } }));
  return {
    paths,
    fallback: true
  };
}

export async function getStaticProps({ params }) {
  let posts, tags, category;
  try {
    posts = await getPosts({ include: "tags", filter: `tag:${params.slug}` });
    tags = await getTags();
    category = posts[0].primary_tag.name
  } catch (e) {
    return { notFound: true };
  }

  return {
    props: {
      posts,
      category,
      categories: tags
    }
  };
}