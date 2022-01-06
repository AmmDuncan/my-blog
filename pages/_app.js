import "prismjs/plugins/autoloader/prism-autoloader.min";

import "../styles/main.scss";
import "@fontsource/dm-serif-text/400.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import React, { createContext } from "react";
import App from "next/app";
import Router from "next/router";
import Image from "next/image";
import Head from "next/head";
import Navbar from "../components/Navbar/Navbar";
import Loader from "../components/Loader/Loader";
import { getPostsWithTags } from "../api/axios";

let post = [];

export const AllPosts = createContext([]);

class MyApp extends App {
  state = {
    loading: false,
    posts: []
  };

  constructor(props) {
    super(props);
    Router.onRouteChangeStart = (url) => {
      if (url !== window.location.pathname) this.setState(() => ({ loading: true }));
    };
    Router.onRouteChangeComplete = () => {
      this.setState(() => ({ loading: false }));
    };
  }

  componentDidMount() {
    getPostsWithTags().then(
      posts => this.setState({ posts })
    );
  }

  render() {
    const { Component, pageProps } = this.props;
    if (this.state.loading) {
      return <div>
        <Navbar />
        <div>
          <div
            style={{
              position: "fixed",
              width: "100vw",
              height: "140vh",
              display: "grid",
              grid: "auto-flow max-content / 15rem",
              placeContent: "center",
              transform: "scale(0.7) translateY(-24rem) translateX(-2rem)"
            }}>
            <Image width={80} height={150} src="/assets/images/soft-meme.gif" alt="" />
            <Loader style={{
              transform: "translateX(2rem) translateY(-1rem)"
            }} />
          </div>
        </div>
      </div>;
    }
    return <AllPosts.Provider value={this.state.posts}>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <Component {...pageProps} />
    </AllPosts.Provider>;
  }
}

export default MyApp;


/*import "../styles/main.scss";
import "@fontsource/dm-serif-text/400.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import { createContext, useEffect, useState } from "react";
import { getPostsWithTags } from "../api/axios";

export const AllPosts = createContext([])

function MyApp ({ Component, pageProps }) {
    const [posts, setPosts] = useState([])
    useEffect(() => {
      getPostsWithTags().then(res => setPosts(res))
    }, [])
    return <AllPosts.Provider value={posts}><Component {...pageProps} /></AllPosts.Provider>
}

export default MyApp;
*/