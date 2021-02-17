import Head from "next/head";
import styles from "../styles/Home.module.css";
import JobBoards from "../components/JobBoards";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Job Boards</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <JobBoards />
    </div>
  );
}
