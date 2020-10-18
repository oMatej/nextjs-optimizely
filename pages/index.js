import Head from 'next/head'
import Link from 'next/link';
import { OptimizelyExperiment, OptimizelyVariation } from '@optimizely/react-sdk';

import styles from '../styles/Home.module.css'

import { getDatafile } from "../optimizely/datafile";
import { getOptimizelyUserId } from "../optimizely/user";
import { withOptimizelyProvider } from "../optimizely/withOptimizelyProvider";

const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <div>
          <Link href="/?test=a">A</Link>
          <Link href="/?test=b">B</Link>
          <Link href="/?qaParam=DEV_experiment">C</Link>
          <p>Experiments:</p>
          <OptimizelyExperiment experiment="DEV_experiment" autoUpdate>
            {variation => <p>got variation {variation}</p>}
          </OptimizelyExperiment>
          <hr/>
          <OptimizelyExperiment experiment="DEV_experiment" autoUpdate>
            <OptimizelyVariation variation="variation_1">
              variation_1
            </OptimizelyVariation>
            <OptimizelyVariation variation="variation_2">
              variation_2
            </OptimizelyVariation>
            <OptimizelyVariation default>
              default
            </OptimizelyVariation>
          </OptimizelyExperiment>
        </div>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
};

export const getServerSideProps = async ({ req, res }) => {
  const datafile = await getDatafile();
  const id = getOptimizelyUserId(req, res);

  return {
    props: {
      datafile,
      id
    }
  };
};

export default withOptimizelyProvider(Home);