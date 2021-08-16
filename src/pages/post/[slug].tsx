import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import {MdDateRange} from "react-icons/md";
import {VscLoading} from "react-icons/vsc";
import {FiUser} from "react-icons/fi";
import {BiTime} from "react-icons/bi";
import Head from "next/head";
import Link from "next/link";
import Prismic from "@prismicio/client"
import { format } from 'date-fns';
import ptBR from "date-fns/locale/pt-BR"
import { RichText } from 'prismic-dom';

interface Post {
  first_publication_date: string | null;
  last_publication_date: string | null,
  previousPost: null | {
    title: string,
    slug: string
  },
  nextPost: null | {
    title: string,
    slug: string
  },
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
  const router = useRouter();

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
    
    return Math.ceil((headingWords.length + textWords.length) / 200);
  }

  const readTime = getReadingTime(post);

  return (
  <>
    <Head>
      <title>{post.data.title} | SpaceTravelling</title>
    </Head>
    <main className={styles.mainContent}>
      {router.isFallback && (
        <div>
          <VscLoading color="#BBBBBB" size="20px"></VscLoading>
          Carregando...
        </div>
      )}
      <div className={styles.postBanner}>
        <img src={post.data.banner.url}/>
      </div>

      <article key={post.data.title} className={styles.postContent}>

        <div className={styles.postHeader}>
          <h1>{post.data.title}</h1>
          <div className={styles.postInfo}>
            <span className={styles.uploadedAt}>
              <MdDateRange color="#BBBBBB" size="20px"/>
              {format(new Date(post.first_publication_date), "d MMM yyyy", {locale: ptBR}) }
            </span>
            <span className={styles.userInfo}>
              <FiUser color="#BBBBBB" size="20px"/>
              {post.data.author}
            </span>
            <span className={styles.readTime}>
              <BiTime color="#BBBBBB" size="20px"/>
              {readTime} min
            </span>
            {post.last_publication_date &&
              (
                <span className={styles.lastEdited}>
                * {`editado em 
                    ${format(new Date(post.last_publication_date), "d MMM yyyy", {locale: ptBR})},
                    às ${format(new Date(post.last_publication_date), "HH:mm", {locale: ptBR})}
                    `}.
              </span>
              )
            }
          </div>
        </div>

        {post.data.content.map(content => (
          <article key = {content.heading} className={styles.postText}>
            <h2>{content.heading}</h2>
            <div dangerouslySetInnerHTML = {
              {__html: RichText.asHtml(content.body)}
            }></div>
          </article>
        ))}
      </article>
      <div className={styles.separator}></div>
    </main>

    <footer className={styles.postFooter}>
      <nav className={styles.footerPostNavigation}>
        {post.previousPost ? ( 
          <div className={styles.prevNav}>
          {post.previousPost.title}
          <Link href={`/post/${post.previousPost.slug}`}>
            <a className={styles.navLink}>Post Anterior</a>
          </Link>
        </div>) : (<div></div>)
        }
        {post.nextPost ? ( 
          <div className={styles.nextNav}>
          {post.nextPost.title}
          <Link href={`/post/${post.nextPost.slug}`}>
            <a className={styles.navLink}>Próximo Post</a>
          </Link>
        </div>) : (<div></div>)
        }
      </nav>
      <div className = {styles.commentContainer}></div>
      <button className = {styles.exitPostPreview}>
        Sair do modo Preview
      </button>
    </footer>
  </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query(
    Prismic.Predicates.at("document.type", "post")
  );

  const postResponseSlug = posts.results.map(post => {
      return {
        params: {
          slug: post.uid 
        }
      }
  });

  return {
    paths: postResponseSlug,
    fallback: true
  }
};

export const getStaticProps: GetStaticProps = async ({params, previewData}) => {
  const prismic = getPrismicClient();
  const refPreview = previewData ? previewData.ref : null;
  
  const postContent = previewData ? await prismic.getByUID("post", String(params.slug), {ref: refPreview}) : 
  await prismic.getByUID("post", String(params.slug), {});


  const prevPost = (await prismic.query(
    Prismic.Predicates.at("document.type","post"),
    { pageSize : 1 , after : `${postContent.id}`, orderings: '[document.first_publication_date]'}
  )).results[0];

  const nextPost = (await prismic.query(
    Prismic.Predicates.at("document.type","post"),
    { pageSize : 1 , after : `${postContent.id}`, orderings: '[document.first_publication_date desc]'}
  )).results[0];

  const formatedPost = {
    uid: postContent.uid,
    first_publication_date: postContent.first_publication_date,
    last_publication_date: postContent.last_publication_date,
    previousPost: prevPost && {
      title: prevPost.data.title,
      slug: prevPost.uid
    } || null,
    nextPost: nextPost && {
      title: nextPost.data.title,
      slug: nextPost.uid
    } || null,
    data: {
      title: postContent.data.title,
      subtitle: postContent.data.subtitle,
      banner: {
        url: String(postContent.data.banner.url)
      },
      author: postContent.data.author,
      content: postContent.data.content
    }
  }

  return {
    props: {
      post: formatedPost,
      preview:
      {
        activeRef: refPreview
      }
    },
    revalidate: 60 * 30
  }

};
