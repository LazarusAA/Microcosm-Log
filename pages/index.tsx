import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Microcosm Log</title>
        <meta name="description" content="Discover the microcosm around you" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to Microcosm Log</h1>
      </main>
    </div>
  )
}

export default Home 