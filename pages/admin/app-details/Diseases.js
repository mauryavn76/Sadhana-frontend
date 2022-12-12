import Button from "../../../components/multiusable/button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";

import BASE_URL from "../../../utils/base-url";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import LinkDiseaseModal from "../../../components/admin/modals/LinkDisease";
import Header from "../../../components/multiusable/header";
import { getToken } from "../../../utils/token";

const Disease = () => {
  const [linkDiseaseModal, setLinkDiseaseModal] = useState(false);

  const [diseases, setDiseases] = useState([]);

  const [viewLinkedModal, setViewLinkedModal] = useState(false);

  const [selectedDisease, setSelectedDisease] = useState();
  const getDiseases = async () => {
    const diseaseResult = await BASE_URL.get("/symptom-disease");
    console.log(diseaseResult.data);
    setDiseases(diseaseResult.data.data);
  };
  useEffect(() => {
    getDiseases();
  }, []);
  console.log("diseases", diseases);

  useEffect(() => {
    diseases?.map((disease) => {
      disease.created_at = new Date(disease.created_at).toLocaleDateString();
    });
  }, [diseases]);

  diseases?.map((symptom, index) => {
    symptom["id"] = index + 1;
  });

  const renderDetailsButton = (params) => {
    return (
      <button
        className="text-blue-600 hover:underline border-0 font-semibold"
        onClick={() => {
          setViewLinkedModal(true);
          setSelectedDisease(params.row);
          // setLinkSymptomModal(true);
          // console.log(params);
        }}
      >
        more
      </button>
    );
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: "Name",
      // width: 150,
      flex: 1,
      headerAlign: "center",
      align: "center",
      // editable: true,
    },
    {
      field: "added_by",
      headerName: "By User",
      // width: 150,
      flex: 1,
      headerAlign: "center",
      align: "center",
      // editable: true,
    },
    {
      field: "created_at",
      headerName: "Added at",
      type: "number",
      // width: 110,
      flex: 1,
      headerAlign: "center",
      align: "center",
      // editable: true,
    },
    {
      field: "Options",
      headerName: "Options",
      type: "number",
      // width: 110,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: renderDetailsButton,
      // editable: true,
    },
  ];

  // console.log(updatedSymptom);

  return (
    <div className="w-4/5">
      <Header title={"Linked Diseases with symptoms"} />
      <LinkDiseaseModal
        show={linkDiseaseModal}
        onHide={() => {
          getDiseases();
          setLinkDiseaseModal(false);
        }}
        setLinkDiseaseModal={setLinkDiseaseModal}
        // linksymptom={updatedSymptom}
        // setLinkSymptom={setUpdatedSymptom}
      />

      <div className="flex justify-end space-x-6 m-4 text-sm">
        {/* <div className="flex flex-1 justify-start">
          <span className="bg-gray-100 p-2 rounded-md text-black text-base font-sans font-medium">
           
          </span>
        </div> */}

        <Button
          label="Link New"
          color="bg-[#8FECFF]"
          onTap={() => setLinkDiseaseModal(true)}
        />
        {/* <Button
          label="View Linked"
          color="bg-[#8FECFF]"
          onTap={() => setViewLinkedModal(true)}
        /> */}
        {/* <Button
          label="Add Tab"
          color="bg-[#8FECFF]"
          onTap={() => setTabModal(true)}
        /> */}
      </div>
      <div className="flex justify-start mb-28 m-4 text-sm"></div>

      <div className="w-full">
        <Box sx={{ height: "70vh", width: "100%" }}>
          <DataGrid
            rows={diseases}
            columns={columns}
            pageSize={20}
            rowsPerPageOptions={[5]}
            // checkboxSelection
            disableSelectionOnClick
            // getRowId={(row) => row._id}
          />
        </Box>
      </div>
      <ShowConnectedDiseases
        disease={selectedDisease}
        show={viewLinkedModal}
        onHide={() => {
          setViewLinkedModal(false);
          getDiseases();
        }}
      />
    </div>
  );
};

export default Disease;

// export async function getServerSideProps(context) {
// const diseaseResult = await BASE_URL.get("/symptom-disease", {
//   headers: {
//     authorization: "Bearer " + getToken(context),
//   },
// });
// const diseases = await diseaseResult.data;
//   console.log(diseases);

//   return { props: { diseases } };
// }

const ShowConnectedDiseases = (props) => {
  // console.log(props.bodyPart);
  const { disease, ...rest } = props;

  const [linkedSymptoms, setLinkedSymptoms] = useState([]);

  const handleLinkDelete = async (id) => {
    const res = await BASE_URL.delete("/symptom-disease/" + id);
    const res1 = await BASE_URL.get("/symptom-disease/" + disease?._id);
    console.log(res.data);
    setLinkedSymptoms(res1.data.data);

    console.log(res);
  };

  useEffect(() => {
    const getBodyPartSymptoms = async () => {
      const res = await BASE_URL.get("/symptom-disease/" + disease?._id);
      console.log(res.data);
      setLinkedSymptoms(res.data.data);
    };
    getBodyPartSymptoms();
  }, [disease]);

  return (
    <Modal
      {...rest}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Linked Symptoms
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="px-14">
          <div>
            <p className="mb-1 text-sm">Name</p>
            <p className="font-bold">{disease?.name}</p>
          </div>
          <div>
            <p className="text-sm mb-1">Linked Symptoms</p>
            <div className=" overflow-y-auto h-28">
              {linkedSymptoms.map((sym, i) => {
                return (
                  <div key={i} className="w-full flex justify-between">
                    <span className="font-semibold">{sym.name}</span>
                    <span
                      className="text-red-600"
                      onClick={() => handleLinkDelete(sym._id)}
                    >
                      delete
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p> */}
      </Modal.Body>
      <Modal.Footer>
        {/* <Button onClick={props.onHide}>Close</Button> */}
      </Modal.Footer>
    </Modal>
  );
};
