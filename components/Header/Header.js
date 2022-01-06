import React from 'react';
import Image from "next/image";
import classnames from 'classnames'
import styles from "./Header.module.scss"

const Header = () => {
  return (
    <header className={styles.header}>
    <div className={classnames(styles.container, 'container')}>
      <div className={styles.content}>
        <h1>Hello there,</h1>
        <p>Welcome to my space.
          An open look into insights from my journey.
        </p>
      </div>
      <div className={styles.illustration}>
        <Image width="200px" height="200px" alt="" src="/assets/images/header-illustration.svg"/>
      </div>
    </div>
  </header>)
}

export default Header