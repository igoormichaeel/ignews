import { useSession, signIn, signOut } from "next-auth/react";

import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";

import styles from "./styles.module.scss";

export function SignInButton() {
  const { data: session } = useSession();

  return session ? (
    <button className={styles.signInButton}>
      <FaGithub color="#04D361" />
      {session.user.name}
      <FiX className={styles.closeIcon} onClick={() => signOut()} />
    </button>
  ) : (
    <button className={styles.signInButton} onClick={() => signIn("github")}>
      <FaGithub color="#EBA417" />
      Sign in with GitHub
    </button>
  );
}
