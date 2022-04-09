import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'

const ProfileComponent = () => {
  <Image
    src='/images/profile.jpg'
    height={144}
    width={144}
    alt='Henrique Kirch Heck'
  />
}

export default function FirstPost() {
  return (
    <>
      <Head>
        <title>First Post</title>
      </Head>
      <h1>First Post</h1>
      <h2>
        <Link href='/'>
          <a>Back to home</a>
        </Link>
      </h2>
    </>
  )
}
