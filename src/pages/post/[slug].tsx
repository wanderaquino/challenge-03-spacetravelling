import { GetStaticPaths, GetStaticProps } from 'next';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import {MdDateRange} from "react-icons/md";
import {FiUser} from "react-icons/fi";
import {BiTime} from "react-icons/bi";
import Head from "next/head";


interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post() {
  return (
    <>
    <Head>
      <title>Post 1 | SpaceTravelling</title>
    </Head>

    <div className={styles.postBanner}>
    <img src="/images/banner.png" />
    </div>

    <article className={styles.postContent}>
      <div className={styles.postHeader}>
        <h1>Criando um App CRA do Zero</h1>
        <div className={styles.postInfo}>
          <span className={styles.uploadedAt}>
            <MdDateRange color="#BBBBBB" size="20px"/>
            01 Ago 2021
          </span>
          <span className={styles.userInfo}>
            <FiUser color="#BBBBBB" size="20px"/>
            Danilo Vieira
          </span>
          <span className={styles.userInfo}>
            <BiTime color="#BBBBBB" size="20px"/>
            5 min
          </span>
        </div>
      </div>

      <article className={styles.postFirstGroup}>
        <h2>Proin Et Varius</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Ex assumenda ullam nam nobis cupiditate eum dolorem, 
          repellat quasi, cum expedita modi deserunt omnis totam reprehenderit dolore? 
          Eum unde ea odio?
        </p>
      </article>

      <article className={styles.postSecondGroup}>
        <h2>Proin Et Varius</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Ex assumenda ullam nam nobis cupiditate eum dolorem, 
          repellat quasi, cum expedita modi deserunt omnis totam reprehenderit dolore? 
          Eum unde ea odio?
        </p>

        <h2>Proin Et Varius</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Ex assumenda ullam nam nobis cupiditate eum dolorem, 
          repellat quasi, cum expedita modi deserunt omnis totam reprehenderit dolore? 
          Eum unde ea odio?
        </p>

        <h2>Proin Et Varius</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Ex assumenda ullam nam nobis cupiditate eum dolorem, 
          repellat quasi, cum expedita modi deserunt omnis totam reprehenderit dolore? 
          Eum unde ea odio?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Ex assumenda ullam nam nobis cupiditate eum dolorem, 
          repellat quasi, cum expedita modi deserunt omnis totam reprehenderit dolore? 
          Eum unde ea odio?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Ex assumenda ullam nam nobis cupiditate eum dolorem, 
          repellat quasi, cum expedita modi deserunt omnis totam reprehenderit dolore? 
          Eum unde ea odio?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Ex assumenda ullam nam nobis cupiditate eum dolorem, 
          repellat quasi, cum expedita modi deserunt omnis totam reprehenderit dolore? 
          Eum unde ea odio?
        </p>

        <h2>Proin Et Varius</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Ex assumenda ullam nam nobis cupiditate eum dolorem, 
          repellat quasi, cum expedita modi deserunt omnis totam reprehenderit dolore? 
          Eum unde ea odio?
        </p>
      </article>

    </article>
    </>
  )
}

// export const getStaticPaths = async () => {
//   const prismic = getPrismicClient();
//   const posts = await prismic.query(TODO);

//   // TODO
// };

// export const getStaticProps = async context => {
//   const prismic = getPrismicClient();
//   const response = await prismic.getByUID(TODO);

//   // TODO
// };
