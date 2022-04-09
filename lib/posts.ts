import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

interface MatterData {
  title: string
  date: string
}

export interface PostData {
  id: string
  contentHtml?: string
  date: string
  title: string
}

export function getSortedPostsData(): PostData[] {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName): PostData => {
    const id = fileName.replace(/\.md$/, '')

    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf-8')

    const matterResult = matter(fileContents)

    return {
      id,
      ...(matterResult.data as MatterData),
    }
  })

  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) return 1
    if (a > b) return -1
    return 0
  })
}

export function getAllPostsIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    }
  })
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf-8')

  const matterResult = matter(fileContents)

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  return { id, contentHtml, ...(matterResult.data as MatterData) } as PostData
}
