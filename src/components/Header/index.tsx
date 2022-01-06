import Image from "next/image";
import Link from "next/link";
import { ActiveLink } from "../ActiveLink";
import { SignInButton } from "../SignInButton";

import logoSvg from "../../../public/images/logo.svg";

import styles from "./styles.module.scss";

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <ActiveLink href="/" activeClassName={styles.active}>
          <a>
            <Image src={logoSvg} alt="ig.news logo" />
          </a>
        </ActiveLink>

        <nav>
          <ActiveLink href="/" activeClassName={styles.active}>
            <a>Home</a>
          </ActiveLink>

          <ActiveLink href="/posts" activeClassName={styles.active}>
            <a>Posts</a>
          </ActiveLink>
        </nav>
        <SignInButton />
      </div>
    </header>
  );
}
