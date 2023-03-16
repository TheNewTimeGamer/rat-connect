import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import TunnelTable from '@/components/tunnel-table/TunnelTable'
import TunnelInput from '@/components/tunnel-input/TunnelInput'
import TunnelHeader from '@/components/tunnel-header/TunnelHeader'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <h2>Rat-connect</h2>
                <TunnelHeader></TunnelHeader>
                <TunnelInput></TunnelInput>
                <TunnelTable></TunnelTable>
            </main>
        </>
    )
}