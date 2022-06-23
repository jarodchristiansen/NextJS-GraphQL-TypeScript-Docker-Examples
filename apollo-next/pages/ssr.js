import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { gql } from "@apollo/client";
import client from "../apollo-client";


function fetchDate(date) {
    const newDate = new Date(date);

    const day = newDate.getDate();
    const month = newDate.getMonth();
    const year = newDate.getFullYear();

    return [day, month, year];
};


export default function SSR({nextLaunch}) {

    const {mission_name, launch_date_local, launch_site} = nextLaunch;
    const nextLaunchDate = fetchDate(launch_date_local).join('/');

    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    Next SpaceX Launch
                </h1>
                <p className={styles.description}>
                    <span>🚀 Mission name: <strong>{mission_name}</strong></span>
                    <span>📅 Date: <strong>{nextLaunchDate}</strong></span>
                    <span>🏠 Launched from: <strong>{launch_site.site_name_long}</strong></span>
                </p>
            </main>
        </div>
    )
}


export async function getServerSideProps() {
    const { data } = await client.query({
        query: gql`
      query NextLaunch {
        launchNext {
          mission_name
          launch_date_local
          launch_site {
            site_name_long
          }
        }
      }
    `,
    });
    return {
        props: {
            nextLaunch: data.launchNext,
        },
    };
}