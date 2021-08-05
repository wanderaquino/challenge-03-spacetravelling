import Head from "next/head";
import styles from './home.module.scss';
import {MdDateRange} from "react-icons/md";
import {FiUser} from "react-icons/fi";

import { GetStaticProps } from 'next';
import { getPrismicClient } from '../services/prismic';
import commonStyles from '../styles/common.module.scss';

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


export default function Home() {
  return (
    <>
      <Head>
        <title>Home | SpaceTravelling</title>
      </Head>
      <main className={styles.posts}>
        
        <div className={styles.postCardContainer}>
          <a className={styles.postCardHeading} href="/post/1">Como utilizar useEffect</a>
          <div className={styles.postCardFooter}>
            
            <span className={styles.uploadedAt}>
              <MdDateRange color="#BBBBBB" size="20px"/>
              01 Ago 2021
            </span>

            <span className={styles.userInfo}>
              <FiUser color="#BBBBBB" size="20px"/>
              Danilo Vieira
            </span>
          </div>
        </div>

        <div className={styles.postCardContainer}>
          <a className={styles.postCardHeading} href="">Criando um APP CRA do Zero</a>
          <div className={styles.postCardFooter}>
            
            <span className={styles.uploadedAt}>
              <MdDateRange color="#BBBBBB" size="20px"/>
              01 Jul 2021
            </span>

            <span className={styles.userInfo}>
              <FiUser color="#BBBBBB" size="20px"/>
              Danilo Vieira
            </span>
          </div>
        </div>

        <div className={styles.postCardContainer}>
          <a className={styles.postCardHeading} href="">Como utilizar hooks</a>
          <div className={styles.postCardFooter}>
            
            <span className={styles.uploadedAt}>
              <MdDateRange color="#BBBBBB" size="20px"/>
              15 Jun 2021
            </span>

            <span className={styles.userInfo}>
              <FiUser color="#BBBBBB" size="20px"/>
              Danilo Vieira
            </span>
          </div>
        </div>
      </main>
    </>
  )
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient();
//   // const postsResponse = await prismic.query(TODO);

//   // TODO
// };
