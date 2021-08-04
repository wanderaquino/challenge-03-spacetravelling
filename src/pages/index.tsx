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
      <main>
        <div className={styles.postContainer}>
          <div className={styles.post}>
            <span>Como utilizar hooks</span>
            <div className={styles.postFooter}>
              <MdDateRange />
              <span>15 Mar 2021</span>
              <FiUser />
              <span>Danilo Vieira</span>
            </div>
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
