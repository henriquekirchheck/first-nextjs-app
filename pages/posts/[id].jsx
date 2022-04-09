import { Layout } from '../../components/Layout'
import { getAllPostsIds } from '../../lib/posts'

export async function getStaticPaths() {
  const paths = getAllPostsIds()
  return {
    paths,
    fallback: false
  }
}

export default function Post({ id }) {
  return <Layout> {id} </Layout>
}