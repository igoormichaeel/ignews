import Head from "next/head";
import { RichText } from "prismic-dom";
import { GetStaticPaths, GetStaticProps } from "next";
import { getPrismicClient } from "../../../services/prismic";

import styles from "../post.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

interface PostPreviewProps {
  post: {
    slug: string;
    title: string;
    body: string;
    updatedAt: string;
  };
}

export default function PostPreview({ post }: PostPreviewProps) {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.activeSubscription) {
      router.push(`/posts/${post.slug}`);
    }
  }, [session, router, post.slug]);

  return (
    <>
      <Head>
        <title>{post.title} | ig.news</title>
      </Head>
      <main className={styles.container}>
        <article className={styles.content}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            dangerouslySetInnerHTML={{ __html: post.body }}
            className={`${styles.postContent} ${styles.previewPostContent}`}
          />
          <div className={styles.continueReading}>
            Wanna continue reading? 
            <Link href="/">
              <a href="">Subscribe now 🤗</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient();

  const response = await prismic.getByUID<any>("post", String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    body: RichText.asHtml(response.data.content.splice(0, 3)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ),
  };

  return {
    props: { post },
    revalidate: 60 * 30, // 30 minutos */
  };
};
