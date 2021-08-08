import { GetStaticPaths, GetStaticProps } from 'next';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import {MdDateRange} from "react-icons/md";
import {FiUser} from "react-icons/fi";
import {BiTime} from "react-icons/bi";
import Head from "next/head";
import Prismic from "@prismicio/client"
import { format } from 'date-fns';
import ptBR from "date-fns/locale/pt-BR"


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

export default function Post({post}: PostProps) {

  function getReadingTime (post) {

    //Heading Counter
    const headingWords = post.data.content.reduce((acc, content) => {
      const headings = content.heading.split(" ");
      return acc.concat(
        headings.filter(heading => {
          return heading.length > 1;
        })
      );
    }, []);

    //Body Counter
    const body = post.data.content.reduce((acc, content) => {
      return acc.concat(content.body);
    }, []);

    const textWords = body.reduce((acc, body) => {
      const splitedText = body.text.split(" ");
      const filteredText = splitedText.filter(text => {
        return text.length > 1;
      })

      return acc.concat(filteredText);

    }, []);
    
    return Math.round((headingWords.length + textWords.length) / 200);
  }

  const readTime = getReadingTime(post);

  return (
    <>
    <Head>
      <title>{post.data.title} | SpaceTravelling</title>
    </Head>

    <div className={styles.postBanner}>
      <img src={post.data.banner.url}/>
    </div>

    <article className={styles.postContent}>
      <div className={styles.postHeader}>
        <h1>{post.data.title}</h1>
        <div className={styles.postInfo}>
          <span className={styles.uploadedAt}>
            <MdDateRange color="#BBBBBB" size="20px"/>
            {post.first_publication_date}
          </span>
          <span className={styles.userInfo}>
            <FiUser color="#BBBBBB" size="20px"/>
            {post.data.author}
          </span>
          <span className={styles.userInfo}>
            <BiTime color="#BBBBBB" size="20px"/>
            {readTime} min
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

export const getStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query(
    Prismic.Predicates.at("document.type", "post")
  );

  const postResponseSlug = posts.results.map(post => {
      return {
        params: { slug: post.uid
        }
      }
  });

  return {
    paths: postResponseSlug,
    fallback: true
  }
};

export const getStaticProps = async ({params}) => {
  const prismic = getPrismicClient();
  const postContent = await prismic.getByUID("post", String(params.slug), {});

  const formatedPost = {
    first_publication_date: format(new Date(postContent.first_publication_date), "d MMM yyyy", {locale: ptBR}),
    data: {
      title: postContent.data.title,
      banner: {
        url: String(postContent.data.banner.url)
      },
      author: postContent.data.author,
      content: postContent.data.content,
    }
  }

  return {
    props: {
      post: formatedPost 
    }
  }
};
