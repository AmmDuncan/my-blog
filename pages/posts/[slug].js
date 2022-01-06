import Prism from "prismjs";
import Image from "next/image";
import Head from "next/head";
import classnames from "classnames";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { useEffect } from "react";

import Navbar from "../../components/Navbar/Navbar";
import { getPost, getPosts } from "../../api";

import styles from "./SinglePost.module.scss";

export default function SinglePost({ post }) {
  const router = useRouter();

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const current_url = process.env.NEXT_PUBLIC_BASE_URL + router.asPath;
  const query = new URLSearchParams();
  query.append("url", current_url);

  if (!post) return <Navbar />;

  return (
    <>
      <Head>
        <title>{post.title} | Ammiel Yawson</title>
        <meta name="description" content={post.meta_description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={current_url} />
        <meta property="og:title" content={post.og_title} />
        <meta property="og:description" content={post.meta_description} />
        <meta property="og:image" content={post.og_image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="ammielyawson.com" />
        <meta property="twitter:url" content={current_url} />
        <meta name="twitter:title" content={post.twitter_title || post.meta_title} />
        <meta name="twitter:description" content={post.twitter_description || post.meta_description} />
        <meta name="twitter:image" content={post.twitter_image || post.og_image} />
      </Head>
      <Navbar />
      <main>
        <header className={classnames(styles["header"], styles["post"], styles["dark"])}>
          <div className="container">
            <div className={classnames(styles["content"])}>
              <h1>{post.title}</h1>
              <div className={styles["summary"]}>
                <div className={styles["author"]}>By {post.primary_author.name}</div>
                <div className={styles["date-and-time"]}><span
                  className={styles["date"]}>{format(new Date(post.created_at), "dd MMMM yyyy")}</span><span
                  className={styles["middot"]}>&middot;</span><span
                  className="time">{post.reading_time} min{post.reading_time > 1 ? "s" : null} read</span>
                </div>
                <div className={styles["share-icons"]}>
                  <a href="whatsapp://send?text=The text to share!" data-action="share/whatsapp/share">
                    <svg width="40" height="40" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M15 3C8.373 3 3 8.373 3 15C3 17.2512 3.63234 19.3501 4.71094 21.1504L3.10742 27L9.08203 25.4316C10.8294 26.4251 12.8465 27 15 27C21.627 27 27 21.627 27 15C27 8.373 21.627 3 15 3ZM10.8926 9.40234C11.0876 9.40234 11.2879 9.40116 11.4609 9.41016C11.6749 9.41516 11.9079 9.43083 12.1309 9.92383C12.3959 10.5098 12.9729 11.9799 13.0469 12.1289C13.1209 12.2779 13.1733 12.4534 13.0703 12.6484C12.9723 12.8484 12.9213 12.9695 12.7773 13.1465C12.6283 13.3185 12.4651 13.5321 12.3301 13.6621C12.1811 13.8111 12.0272 13.9745 12.1992 14.2715C12.3712 14.5685 12.9686 15.5421 13.8516 16.3281C14.9866 17.3421 15.9442 17.6537 16.2422 17.8027C16.5402 17.9517 16.7128 17.9285 16.8848 17.7285C17.0618 17.5335 17.6281 16.8644 17.8281 16.5664C18.0231 16.2684 18.2222 16.32 18.4922 16.418C18.7662 16.516 20.2274 17.2358 20.5254 17.3848C20.8234 17.5338 21.0187 17.6075 21.0938 17.7285C21.1707 17.8535 21.1708 18.4486 20.9238 19.1426C20.6768 19.8356 19.4639 20.5057 18.9199 20.5527C18.3709 20.6037 17.8586 20.7995 15.3516 19.8125C12.3276 18.6215 10.4205 15.5242 10.2715 15.3242C10.1225 15.1292 9.06055 13.7139 9.06055 12.2539C9.06055 10.7889 9.82866 10.0714 10.0977 9.77344C10.3717 9.47544 10.6926 9.40234 10.8926 9.40234Z"
                        fill="#61617c" />
                    </svg>
                  </a>
                  <a href={`https://twitter.com/share?ref_src=twsrc%5Etfw&${query.toString()}`} target="_blank">
                    <svg width="40" height="40" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M15 3C8.373 3 3 8.373 3 15C3 21.627 8.373 27 15 27C21.627 27 27 21.627 27 15C27 8.373 21.627 3 15 3ZM21.464 12.535C21.47 12.668 21.473 12.8 21.473 12.932C21.473 17 18.378 21.688 12.717 21.688C10.978 21.688 9.361 21.179 8 20.305C8.241 20.334 8.486 20.347 8.735 20.347C10.178 20.347 11.504 19.856 12.556 19.029C11.209 19.004 10.072 18.114 9.681 16.892C9.869 16.928 10.062 16.947 10.26 16.947C10.541 16.947 10.814 16.909 11.071 16.839C9.663 16.557 8.602 15.313 8.602 13.822C8.602 13.809 8.602 13.796 8.602 13.783C9.017 14.014 9.491 14.152 9.996 14.168C9.171 13.617 8.627 12.674 8.627 11.607C8.627 11.042 8.778 10.513 9.043 10.06C10.561 11.922 12.829 13.148 15.386 13.276C15.334 13.051 15.307 12.816 15.307 12.575C15.307 10.876 16.685 9.497 18.384 9.497C19.269 9.497 20.069 9.871 20.63 10.469C21.331 10.33 21.99 10.075 22.585 9.722C22.355 10.441 21.867 11.043 21.231 11.425C21.853 11.351 22.446 11.186 22.999 10.941C22.588 11.559 22.067 12.1 21.464 12.535Z"
                        fill="#61617c" />
                    </svg>
                  </a>
                  <a href={`https://www.linkedin.com/cws/share?${query.toString()}`} target="_blank">
                    <svg width="40" height="40" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M15 3C8.373 3 3 8.373 3 15C3 21.627 8.373 27 15 27C21.627 27 27 21.627 27 15C27 8.373 21.627 3 15 3ZM10.496 8.403C11.338 8.403 11.899 8.964 11.899 9.712C11.899 10.46 11.338 11.021 10.403 11.021C9.561 11.022 9 10.46 9 9.712C9 8.964 9.561 8.403 10.496 8.403ZM12 20H9V12H12V20ZM22 20H19.176V15.628C19.176 14.419 18.423 14.14 18.141 14.14C17.859 14.14 16.917 14.326 16.917 15.628C16.917 15.814 16.917 20 16.917 20H14V12H16.918V13.116C17.294 12.465 18.047 12 19.459 12C20.871 12 22 13.116 22 15.628V20Z"
                        fill="#61617c" />
                    </svg>
                  </a>
                </div>
              </div>
              <div className={styles["image"]}>
                <Image src={post.feature_image} layout={"fill"} alt="" />
                <span className={styles["primary_tag"]}
                      onClick={() => router.push(`/categories/${post?.primary_tag.slug}`)}>{post?.primary_tag.name}</span>
              </div>
            </div>
          </div>
        </header>
        <main>
          <div className="container">
            <div className={styles["post-content"]} dangerouslySetInnerHTML={{ __html: post.html }} />
          </div>
        </main>
      </main>
      <script src="https://cdn.jsdelivr.net/npm/prismjs@1.25.0/prism.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/prismjs@1.25.0/plugins/autoloader/prism-autoloader.min.js"></script>
    </>
  );
}

export async function getStaticPaths() {
  const posts = await getPosts();
  const paths = posts.map(post => ({ params: { slug: post.slug } }));
  return {
    paths,
    fallback: true
  };
}

export async function getStaticProps({ params }) {
  let post;
  try {
    post = await getPost({ ...params, include: "tags,authors" });
  } catch (e) {
    return { notFound: true };
  }

  return {
    props: {
      post
    }
  };
}