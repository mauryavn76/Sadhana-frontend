import { useEffect, useState } from "react";
import Disease from "../../../components/admin/blogs/disease";
import Header from "../../../components/multiusable/header";
import BASE_URL from "../../../utils/base-url";
import { useRouter } from "next/router";

const AllDiseases = () => {
  const [diseaseDetails, setDiseaseDetails] = useState([]);

  const router = useRouter();

  const getAllDiseaseDetails = async () => {
    const res = await BASE_URL.get("/disease-details");
    setDiseaseDetails(res.data.data);
  };

  const onDelete = async (slug) => {
    const res = await BASE_URL.delete("/disease-details/" + title);
    getAllDiseaseDetails();
    try {
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllDiseaseDetails();
  }, []);

  return (
    <>
      <div className="w-4/5">
        <Header title={"Manage Diseases"} />
        {diseaseDetails.map((disease, i) => {
          return (
            <Disease
              key={i}
              onUpdate={() =>
                router.push(
                  "/admin/disease-details/update-disease-details/" +
                  disease.d_id
                )
              }
              onDelete={onDelete}
              disease={disease}
            />
          );
        })}
      </div>
    </>
  );
};

export default AllDiseases;
