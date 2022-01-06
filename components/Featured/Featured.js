import React from 'react';
import {useRouter} from "next/router";
import Image from "next/image";
import classnames from "classnames";
import {formatDistanceToNow} from "date-fns";

import styles from './Featured.module.scss'

export const dummyFeatured = [
  {
    image: '/assets/images/headphone-thumb.png',
    title: 'Does listening to music really help you learn better? See what latest research is saying',
    date: '7th September, 2021',
    body: 'There are two common approaches you can take with your first blog post. This is one of the most critical things you’ll come to learn when figuring out how to start a blog.' +
      'The first is to use your first post as an introduction to your blog and what you’re setting out to do.' +
      'The second is to jump right into your content as if you’ve been doing it for years.',
    active: true
  },
  {
    image: '/assets/images/code-thumb.png',
    title: 'Getting into web development',
    date: '28th August, 2021',
    body: 'There are two common approaches you can take with your first blog post. This is one of the most critical things you’ll come to learn when figuring out how to start a blog.' +
      'The first is to use your first post as an introduction to your blog and what you’re setting out to do.' +
      'The second is to jump right into your content as if you’ve been doing it for years.'
  },
  {
    image: '/assets/images/arheadset.png',
    title: 'Should you create a component library for yourself?',
    date: '28th August, 2021',
    body: 'There are two common approaches you can take with your first blog post. This is one of the most critical things you’ll come to learn when figuring out how to start a blog.' +
      'The first is to use your first post as an introduction to your blog and what you’re setting out to do.' +
      'The second is to jump right into your content as if you’ve been doing it for years.'
  },
  {
    image: '/assets/images/anxiety.jpeg',
    title: 'Managing global state in Single Page Applications',
    date: '7th September, 2021',
    body: 'There are two common approaches you can take with your first blog post. This is one of the most critical things you’ll come to learn when figuring out how to start a blog.' +
      'The first is to use your first post as an introduction to your blog and what you’re setting out to do.' +
      'The second is to jump right into your content as if you’ve been doing it for years.'
  }
]

const FlatCard = ({title, date, image, active, slug}) => {
  const router = useRouter()
  return <article className={classnames(styles.card, {[styles.active]: active})} onClick={() => router.push(`/posts/${slug}`)}>
    <Image width="200px" height="200px" alt="" src={image}/>
    <div className={styles["content"]}>
      <p className={styles["title"]}>{title}</p>
      <p className={styles["date"]}>{date}</p>
    </div>
  </article>
}

const Featured = ({featured}) => {
  const router = useRouter()

  return (
    <section className={classnames("section", styles.featured)}>
      <h2>Featured</h2>
      <div className={styles.collection}>
        <div className={styles.screen} onClick={() => router.push(`/posts/${featured[0].slug}`)}>
          <>
            <div className={styles["image-container"]}>
              <Image layout='fill' alt="" src={featured[0].feature_image} loading='lazy'/>
            </div>
            <div className={styles.content}>
              <div className={styles.tags}>
                <div className={styles.tag}>{featured[0].primary_tag.name}</div>
              </div>
              <p className={styles.title}>{featured[0].title}</p>
              <p className={styles.date}>{formatDistanceToNow(new Date(featured[0].created_at))} ago</p>
            </div>
          </>
        </div>
        <div className={styles["cards"]}>
          {featured.map((post, i) => {
            const {uuid, feature_image, title, created_at, slug} = post
            const derrivedPost = {
              title,
              image: feature_image,
              date:`${formatDistanceToNow(new Date(created_at))} ago`,
              slug,
              active: i === 0
            }
              return (<FlatCard {...derrivedPost} key={uuid}/>)
            }
          )}
        </div>
      </div>
    </section>

  )
}

export default Featured;