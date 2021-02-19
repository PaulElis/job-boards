import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import JobBoardsTable from "../../../components/JobBoardsTable";

const index = props => {
  const router = useRouter();
  // let id = parseInt(router.asPath.substring(6));
  //   console.log("jobBoard: ", jobBoard);

  //   const jobs = opportunities.filter(opportunity => {
  //     return opportunity.job_source === jobBoard.root_domain;
  //   });

  //   console.log("jobs: ", jobs);
  console.log("props: ", props);
  console.log("router: ", router);
  return <div>{/* <JobBoardsTable /> */}</div>;
};

export default index;

// export async function getStaticProps(context) {
//   const res = await fetch(`https://.../data`);
//   const data = await res.json();

//   if (!data) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: {}, // will be passed to the page component as props
//   };
// }
