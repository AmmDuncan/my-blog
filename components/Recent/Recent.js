import React from "react";
import Image from "next/image";
import classnames from "classnames";

import styles from "./Recent.module.scss";
import { useRouter } from "next/router";
import { formatDistanceToNow } from "date-fns";

export const HorizontalCard = ({ title, date, tag, image, body, clicked }) => {
  return <article className={styles["card"]} onClick={clicked}>
    <Image width="200px" height="200px" alt="" src={image} />
    <div className={styles["content"]}>
      <div className={styles["extras"]}>
        <p className={styles["topic"]}>{tag}</p>
        <p className={styles["date"]}>{date}</p>
      </div>
      <p className={styles["title"]}>{title}</p>
      <p className={styles["body"]}>{body.slice(0, 150)}...</p>
    </div>
  </article>;
};

const Recent = ({ posts, categories = [] }) => {
  const router = useRouter();
  return (<section className={classnames("section", styles.latest)}>
      <div className={styles["topics"]}>
        <h2>Categories</h2>
        <ul className={styles["topics-list"]}>
          {categories.map(c => <li key={c.id} onClick={() => router.push(`/categories/${c.slug}`)}>{c.name}</li>)}
        </ul>
      </div>
      <hr className={styles["mob-only"]} />
      <div className={styles["recent"]}>
        <h2>Recently Added</h2>
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

    </section>
  );
};

export default Recent;