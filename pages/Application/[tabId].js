import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
// import DOMPurify from "dompurify";
// import DOMPurify from "isomorphic-dompurify";
import draftToHtml from "draftjs-to-html";
import BASE_URL from "../../utils/base-url";
import { gql, GraphQLClient } from 'graphql-request'

const Tab = ({ details }) => {
  console.log(details)

  // const router = useRouter();
  // console.log("object", details)
  // // const [details, setDetails] = useState([]);
  // // const { tabId } = router.query;
  // // console.log(router.query);
  // // const getDiseaseDetails = async () => {
  // //   const res = await axios.get(
  // //     "https://sadhna-backend.herokuapp.com/api/disease-details?d_id=" + tabId
  // //   );
  // //   setDetails(res.data.data);
  // //   console.log(res);
  // // };

  // // useEffect(() => {
  // //   getDiseaseDetails();
  // // }, [tabId]);

  const [selectedTab, setSelectedTab] = useState(0);

  // console.log("selectedTab", selectedTab);
  const tabDetails = details?.data?.reduce((arr, curr) => {
    arr.push({
      // id: curr?.,
      name: curr?.name,
      content: curr?.tab_content,
    });
    return arr;
  }, []);

  // console.log(tabDetails)

  // // const createMarkup = (html) => {
  // //   return {
  // //     __html: DOMPurify.sanitize(html),
  // //   };
  // // };

  console.log("tabDetails", tabDetails)
  return (
    <div>
      <div className="w-full h-12">
        <div className="flex w-full h-10 justify-center items-center space-x-16  ">
          <div className="text-cyan-600 font-bold">{details?.title}</div>
          <div className="space-x-12 ">
            {tabDetails &&
              tabDetails?.map((d, i) => {
                return (
                  <button
                    className={selectedTab === i && "text-black font-bold"}
                    key={d?.name}
                    onClick={() => {
                      setSelectedTab(i);
                    }}
                  >
                    {d.name}
                  </button>
                );
              })}
          </div>
        </div>
      </div>

      <div className="h-[50vh] tab-content">
        <img className="w-full h-full" src="/images/ssss.jpg" alt="" />
      </div>
      <div
        className="h-max py-6 px-40"
        dangerouslySetInnerHTML={{
          __html: tabDetails[selectedTab]?.content
        }}
      ></div>
    </div >
    // <div></div>
  );
};

export default Tab;

export async function getServerSideProps(context) {


  console.log("params", context.params.tabId)


  const title = context.params.tabId;
  const res = await BASE_URL.get("/disease-details?d_id=" + title);
  const details = res.data.data;
  return {
    // return {
    props: {
      details
    },
  }
}

// export async function getStaticPaths() {
//   return {
//     paths: [],
//     fallback: false,
//   };
// }
