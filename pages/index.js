import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import client from "../Apollo/apollo-client";
import { gql } from "@apollo/client";
import ContentfulImage from "../components/ctf-img";
import styles from "../styles/Home.module.css";
import PostBody from "../components/post-body";

export default function Home({ postCollection }) {
  console.log(postCollection);
  return (
    <div className={styles.main}>
      <h1>HOME</h1>
      <div className={styles.container}>
        {postCollection?.items.length > 0 &&
          postCollection?.items.map((item) => (
            <div key={item.slug} className={styles.articles}>
              <h3>{item.title}</h3>
              <h6>{item.excerpt}</h6>
              <PostBody content={item.content} />
              <div style={{ width: "200px" }} className={styles.img}>
                <ContentfulImage
                  src={item.coverImage.url}
                  width={item.coverImage.width}
                  height={item.coverImage.height}
                  layout="responsive"
                  alt={item.coverImage.description}
                  className={styles.imgBorder}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query PostCollection($preview: Boolean) {
        postCollection(preview: $preview) {
          items {
            title
            slug
            content {
              json
              links {
                assets {
                  block {
                    sys {
                      id
                    }
                    url
                    description
                  }
                }
              }
            }
            excerpt
            coverImage {
              title
              description
              url
              width
              height
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      postCollection: data.postCollection,
    },
  };
}
