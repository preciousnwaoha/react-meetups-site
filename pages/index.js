import React from "react";
import Head from "next/head"
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  return <>
  <Head>
      <title>React Meetups</title>
      <meta name="description" content="Browse a huge list of highly active React meetups!" />
  </Head>
  <MeetupList meetups={props.meetups} /></>;
};



// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API or use credentials or anything on the server
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  // fetch data from an API or do whatever to get data

  const client = await MongoClient.connect(
    "mongodb+srv://precious:Of8EUPvQe2bLLXbc@cluster0.nhwug.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.imgage,
        id: meetup._id.toString()
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
