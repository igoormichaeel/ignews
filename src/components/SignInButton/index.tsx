import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

import styles from './styles.module.scss'

export function SignInButton() {
  const isUserLoggedIn = false

  return isUserLoggedIn ? (
    <button className={styles.signInButton}>
      <FaGithub color="#04D361" />
      igoormichaeel
      <FiX className={styles.closeIcon} />
    </button>
  ) : (
    <button className={styles.signInButton}>
      <FaGithub color="#EBA417" />
      Sign in with GitHub
    </button>
  )
}
