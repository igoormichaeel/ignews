import Head from 'next/head'
import Image from 'next/image'

import avatarSvg from '../../public/images/avatar.svg'
import { SubscribeButton } from '../components/SubscribeButton'

import styles from './home.module.scss'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className={styles.content}>
        <section className={styles.hero}>
          <span> 👏 Hey, welcome</span>
          <h1>
            News about the <span>React</span> world
          </h1>
          <p>
            Get acces to all the publications <span>for $9.90 month</span>
          </p>

          <SubscribeButton />
        </section>

        <Image src={avatarSvg} alt="Avatar svg" />
      </main>
    </>
  )
}
