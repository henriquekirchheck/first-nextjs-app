import { Layout } from '../../components/Layout'
import { Date } from '../../components/Date'
import { getAllPostsIds, getPostData, PostData } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostsIds()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: { params: { id: string } }) => {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData,
    },
  }
}

export default function Post({ postData }: {postData: PostData}) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}
