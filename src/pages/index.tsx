import Head from "next/head";
import styles from './home.module.scss';
import {MdDateRange} from "react-icons/md";
import {FiUser} from "react-icons/fi";
import next, { GetStaticProps } from 'next';
import { getPrismicClient } from '../services/prismic';
import Prismic from "@prismicio/client";
import {format} from "date-fns";
import ptBR from "date-fns/locale/pt-BR"
import commonStyles from '../styles/common.module.scss';
import { useState } from "react";

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}


export default function Home({postsPagination} : HomeProps) {
  
  const [results, setResults] = useState<Post[]>(postsPagination.results);
  const [next_page, setNextPage] = useState<string>(postsPagination.next_page);

  async function getNextPosts (pageURL) {

    if(pageURL != null || pageURL != undefined) {
      const pagePostsResponse:PostPagination = 
      await fetch(pageURL)
        .then(
          response => response.json()
        );
        const newPosts = pagePostsResponse.results.map(post => {

          const formatedDate = 
          format(new Date(post.first_publication_date), 
          "d MMM yyyy", 
          {locale: ptBR});
      
          return {
            uid: post.uid,
            first_publication_date: formatedDate,
            data: {
              title: post.data.title,
              subtitle: post.data.subtitle,
              author: post.data.author
            }
          }
        });
  
      setResults([...results, ...newPosts]);
      setNextPage(pagePostsResponse.next_page);
    }
  }

  return (
    <>
      <Head>
        <title>Home | SpaceTravelling</title>
      </Head>
      <main className={styles.posts}>
        {results.map(
          post => 
          (
            <div key= {post.uid} className={styles.postCardContainer}>
              <a className={styles.postCardHeading} href={`/post/${post.uid}`}>{post.data.title}</a>

              <span className={styles.postSubtitle}>{post.data.subtitle}</span>

              <div className={styles.postCardFooter}>
                
                <span className={styles.uploadedAt}>
                  <MdDateRange color="#BBBBBB" size="20px"/>
                  {post.first_publication_date}
                </span>
    
                <span className={styles.userInfo}>
                  <FiUser color="#BBBBBB" size="20px"/>
                  {post.data.author}
                </span>
              </div>
            </div>
          )
        )}

        {next_page && (
          <button 
            className={styles.postButton}type="button" 
            onClick={() => getNextPosts(next_page)}>
            Carregar mais posts
          </button>
        )}
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    Prismic.predicates.at("document.type", "post"),
    {
      pageSize: 2
    }
  );

  const posts = postsResponse.results.map(post => {
    const formatedDate = 
    format(new Date(post.first_publication_date), 
    "d MMM yyyy", 
    {locale: ptBR});

    return {
      uid: post.uid,
      first_publication_date: formatedDate,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author
      }
    }
  })

  return {
    props: { 
      postsPagination: {
      next_page: postsResponse.next_page,
      results: posts
      }
    }
  }
};
