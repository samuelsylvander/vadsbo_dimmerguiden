import Head from 'next/head'
import MyApp from "./_app"

export default function Home() {
  return (
    <>
      <Head> 
        <title>Vadsbo dimmerGuiden</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" />
      </Head>
      <MyApp />
    </>
  )
}
