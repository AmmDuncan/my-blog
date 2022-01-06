import React, { createRef, useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import classnames from "classnames";

import Logo from "../../assets/Logo";
import styles from "./Navbar.module.scss";
import Loader from "../Loader/Loader";
import { AllPosts } from "../../pages/_app";

const searchIn = (obj, field, value) => {
  return obj[field].toString().toLowerCase().replaceAll(/<.+?>/g, "").includes(value.toLowerCase());
};

const Navbar = () => {
  const router = useRouter();
  const postsContext = useContext(AllPosts);
  const [isOpen, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState(null);
  const searchRef = createRef()

  useEffect(() => {
    setLoading(true);
    if (search) {
      let allPosts = postsContext;
      setPosts(allPosts ? allPosts.filter(pp => searchIn(pp, "title", search)
        || searchIn(pp, "html", search)
        || searchIn(pp, "excerpt", search)
        || searchIn(pp, "tags", search)).slice(0, 4) : posts);
      window.p = allPosts;
    }
    setLoading(false);
  }, [search]);

  return (
    <nav className={styles.navbar}>
      <div className={styles["nav-brand"]}>
        <Link href="/" passHref={true}>
          <Logo />
        </Link>
        <Link href="/">
          mmiel Yawson
        </Link>

      </div>

      <div className={styles["nav-open-btn"]} onClick={() => setOpen(true)}>
        <svg width="28" height="22" viewBox="0 0 28 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="20" height="2" rx="1" fill="#DAD0F2" />
          <rect y="10" width="28" height="2" rx="1" fill="#DAD0F2" />
          <rect y="20" width="28" height="2" rx="1" fill="#DAD0F2" />
        </svg>
      </div>
      <div className={styles["group-right"]}>
        <ul>
          <li><Link href="/">Browse</Link></li>
          {/*<li><Link href="#">Categories</Link></li>*/}
          <li><Link href="#">Portfolio</Link></li>
        </ul>

        {/* SEARCH */}
        <div className={styles.search}>
          <input type="text" placeholder="What are you interested in?" value={search} ref={searchRef}
                 onChange={(e) => setSearch(e.target.value)} onSubmit={() => {
            router.push(`posts?search=${search}`, { shallow: true });
            setSearch("");
          }} />
          <button
            onClick={() => {
              if (search) {
                setSearch("");
              } else {
                searchRef.current.focus();
              }
            }}>
            {!search ? <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                viewBox="0 0 226 226"
              >
                <g
                  fill="none"
                  strokeMiterlimit={10}
                  fontFamily="none"
                  fontWeight="none"
                  fontSize="none"
                  textAnchor="none"
                  style={{
                    mixBlendMode: "normal"
                  }}
                >
                  <path d="M0 226V0h226v226z" />
                  <path
                    d="M84.75 18.833c-36.293 0-65.917 29.624-65.917 65.917 0 36.293 29.624 65.917 65.917 65.917 16.46 0 31.499-6.14 43.074-16.185l4.01 4.01v12.175l56.5 56.5 18.833-18.834-56.5-56.5H138.49l-4.01-4.01c10.046-11.574 16.186-26.613 16.186-43.073 0-36.293-29.624-65.917-65.917-65.917zm0 18.834a46.941 46.941 0 0 1 47.083 47.083 46.941 46.941 0 0 1-47.083 47.083A46.941 46.941 0 0 1 37.667 84.75 46.941 46.941 0 0 1 84.75 37.667z"
                    fill="#fff"
                  />
                </g>
                <g>
                  <rect x={0} y={0} height={70} width={2} stroke="white" />
                </g>
              </svg> :
              <svg
                width={10}
                height={10}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="m9.23 0 .77.77L5.77 5 10 9.23l-.77.77L5 5.77.77 10 0 9.23 4.23 5 0 .77.77 0 5 4.23 9.23 0Z"
                  fill="#fff"
                />
              </svg>
            }

            {/*Search*/}
          </button>
          {(search && posts) && <ul className={styles["suggested"]}>
            {
              loading ? <Loader /> : posts ? posts.map(p => <li key={p.title}
                                                                onClick={() => {
                                                                  router.push(`/posts/${p.slug}`);
                                                                  setSearch("");
                                                                }}>{p.title}</li>) : null
            }
          </ul>}
        </div>
      </div>
      <div className={classnames(styles["overlay"], { [styles["show-overlay"]]: isOpen })}
           onClick={() => setOpen(false)} />
      <div className={classnames(styles["mobile-content"], { [styles["show"]]: isOpen })}>
        <div className={styles["close-btn"]} onClick={() => setOpen(false)}>
          <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="14" width="20" height="2" rx="1" transform="rotate(-45 0 14)" fill="#5222D0" />
            <rect width="20" height="2" rx="1" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 16 14)"
                  fill="#5222D0" />
          </svg>
        </div>
        <div className={styles.search}>
          <input type="text" placeholder="What are you interested in?" alue={search}
                 onChange={(e) => setSearch(e.target.value)} onSubmit={() => {
            router.push(`posts?search=${search}`, { shallow: true });
            setSearch("");
          }} />
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              viewBox="0 0 226 226"

            >
              <g
                fill="none"
                strokeMiterlimit={10}
                fontFamily="none"
                fontWeight="none"
                fontSize="none"
                textAnchor="none"
                style={{
                  mixBlendMode: "normal"
                }}
              >
                <path d="M0 226V0h226v226z" />
                <path
                  d="M84.75 18.833c-36.293 0-65.917 29.624-65.917 65.917 0 36.293 29.624 65.917 65.917 65.917 16.46 0 31.499-6.14 43.074-16.185l4.01 4.01v12.175l56.5 56.5 18.833-18.834-56.5-56.5H138.49l-4.01-4.01c10.046-11.574 16.186-26.613 16.186-43.073 0-36.293-29.624-65.917-65.917-65.917zm0 18.834a46.941 46.941 0 0 1 47.083 47.083 46.941 46.941 0 0 1-47.083 47.083A46.941 46.941 0 0 1 37.667 84.75 46.941 46.941 0 0 1 84.75 37.667z"
                  fill="#fff"
                />
              </g>
            </svg>
          </button>
          {(search && posts) && <ul className={styles["suggested"]}>
            {
              loading ? <Loader /> : posts ? posts.map(p => <li key={p.title}
                                                                onClick={() => {
                                                                  router.push(`/posts/${p.slug}`);
                                                                  setSearch("");
                                                                }}>{p.title}</li>) : null
            }
          </ul>}
        </div>
        <ul onClick={() => setTimeout(() => setOpen(false), 200)}>
          <li><Link href="/">Browse</Link></li>
          {/*<li><Link href="#">Categories</Link></li>*/}
          <li><Link href="#">Portfolio</Link></li>
        </ul>
        <div className={styles.image}>
          <Image layout="fill" src="/assets/images/mounts.png" alt="" />
        </div>
      </div>
    </nav>
  )
    ;
};

export default Navbar;