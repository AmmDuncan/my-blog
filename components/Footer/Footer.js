import React from "react";
import Link from "next/link";
import Logo from "../../assets/Logo";

import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles["footer"]}>
      <div className="container">
        <div className={styles["nav-brand"]}>
          <Link href="/" passHref={true}>
            <Logo />
          </Link>
          <Link href="/">Ammiel Yawson</Link>
        </div>

        <section className={styles["secondary"]}>
          <div className={styles["summary"]}>
            I write about Web Development, Web Design, Dev Lifestyle
          </div>

          <div className={styles["contact"]}>
            Get in touch:
            <div className={styles["share-icons"]}>
              <a
                href={`https://twitter.com/ammduncan`}
                target="_blank"
                rel="noreferrer"
                aria-label="See me on Twitter"
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 3C8.373 3 3 8.373 3 15C3 21.627 8.373 27 15 27C21.627 27 27 21.627 27 15C27 8.373 21.627 3 15 3ZM21.464 12.535C21.47 12.668 21.473 12.8 21.473 12.932C21.473 17 18.378 21.688 12.717 21.688C10.978 21.688 9.361 21.179 8 20.305C8.241 20.334 8.486 20.347 8.735 20.347C10.178 20.347 11.504 19.856 12.556 19.029C11.209 19.004 10.072 18.114 9.681 16.892C9.869 16.928 10.062 16.947 10.26 16.947C10.541 16.947 10.814 16.909 11.071 16.839C9.663 16.557 8.602 15.313 8.602 13.822C8.602 13.809 8.602 13.796 8.602 13.783C9.017 14.014 9.491 14.152 9.996 14.168C9.171 13.617 8.627 12.674 8.627 11.607C8.627 11.042 8.778 10.513 9.043 10.06C10.561 11.922 12.829 13.148 15.386 13.276C15.334 13.051 15.307 12.816 15.307 12.575C15.307 10.876 16.685 9.497 18.384 9.497C19.269 9.497 20.069 9.871 20.63 10.469C21.331 10.33 21.99 10.075 22.585 9.722C22.355 10.441 21.867 11.043 21.231 11.425C21.853 11.351 22.446 11.186 22.999 10.941C22.588 11.559 22.067 12.1 21.464 12.535Z"
                    fill="#61617c"
                  />
                </svg>
              </a>
              <a
                href={`https://www.linkedin.com/in/ammiel-yawson-098902124/`}
                aria-label="See me on LinkedIn"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 3C8.373 3 3 8.373 3 15C3 21.627 8.373 27 15 27C21.627 27 27 21.627 27 15C27 8.373 21.627 3 15 3ZM10.496 8.403C11.338 8.403 11.899 8.964 11.899 9.712C11.899 10.46 11.338 11.021 10.403 11.021C9.561 11.022 9 10.46 9 9.712C9 8.964 9.561 8.403 10.496 8.403ZM12 20H9V12H12V20ZM22 20H19.176V15.628C19.176 14.419 18.423 14.14 18.141 14.14C17.859 14.14 16.917 14.326 16.917 15.628C16.917 15.814 16.917 20 16.917 20H14V12H16.918V13.116C17.294 12.465 18.047 12 19.459 12C20.871 12 22 13.116 22 15.628V20Z"
                    fill="#61617c"
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
