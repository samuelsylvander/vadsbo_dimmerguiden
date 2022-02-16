import { connectToDatabase } from "../libs/mongodb";
import Head from "next/head";
import React from "react";

export async function getServerSideProps() {
    const { db } = await connectToDatabase();
    const movies = await db
      .collection("vadsbo")
      .find({})
      .toArray();
    return {
      props: {
        movies: JSON.parse(JSON.stringify(movies)),
      },
    };
  }

  export default function TestPage(props) {
    return (
        <>
        <Head>
            <title>Test page for database queries</title>
        </Head>
        <div>
            <h1>Test Page Here!</h1>
            <p>{JSON.stringify(props.movies)}</p>
        </div>
        </>
    )
  }