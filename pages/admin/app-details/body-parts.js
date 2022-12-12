import axios from "axios";
import Sidebar from "../../../components/admin/admin-sidebar";
import Button from "../../../components/multiusable/button";
import { getToken } from "../../../utils/token";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import SymptomModal from "../../../components/admin/modals/symptons-modals";
import Diseasemodal from "../../../components/admin/modals/desease-modals";
import BASE_URL from "../../../utils/base-url";
import DiseaseTabModal from "../../../components/admin/modals/disease-tab-modal";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import LinkSymptomModal from "../../../components/admin/modals/link-symptom";
import Header from "../../../components/multiusable/header";

const BodyParts = () => {
  const [linksymptomModal, setLinkSymptomModal] = useState(false);
  const [searchdiseaseModal, setSearchDiseaseModal] = useState(false);
  const [diseaseModal, setDiseaseModal] = useState(false);
  const [tabModal, setTabModal] = useState(false);
  const [selected, setSelected] = useState("Symptoms");
  const [updatedSymptom, setUpdatedSymptom] = useState();
  const [updatedDisease, setUpdatedDisease] = useState();
  const [updatedTab, setUpdatedTab] = useState();

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedBodyPart, setSelectedBodyPart] = useState({});
  const [muiSpinner, setShowMuiSpinner] = useState();
  const [bodyParts, setBodyParts] = useState([]);

  const getBodyParts = async () => {
    const bodyPartResult = await BASE_URL.get("/body-symptom");
    setBodyParts(bodyPartResult.data.data);
  };
  useEffect(() => {
    getBodyParts();
  }, []);
  console.log("bodyParts", bodyParts);

  useEffect(() => {
    bodyParts.map((bodyPart) => {
      bodyPart.created_at = new Date(bodyPart.created_at).toLocaleDateString();
    });
  }, [bodyParts]);

  bodyParts.map((symptom, index) => {
    symptom["id"] = index + 1;
  });

  const renderDetailsButton = (params) => {
    return (
      <button
        className="text-blue-600 hover:underline border-0 font-semibold"
        onClick={() => {
          setShowDetailsModal(true);
          setSelectedBodyPart(params.row);
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
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
  ];

  console.log(updatedSymptom);

  return (
    <div className="w-4/5">
      <Header title={"Linked body parts with symptoms"} />
      <LinkSymptomModal
        show={linksymptomModal}
        getBodyParts={getBodyParts}
        onHide={() => {
          setLinkSymptomModal(false);
        }}
        setLinkSymptomModal={setLinkSymptomModal}
        linksymptom={updatedSymptom}
        setLinkSymptom={setUpdatedSymptom}
      />

      <div className="flex justify-end space-x-6 m-4 text-sm">
        {/* <div className="flex flex-1 justify-start">
          <span className="bg-gray-100 p-2 rounded-md text-black text-base font-sans font-medium">
            Linked body parts with symptoms
          </span>
        </div> */}

        <Button
          label="Link New"
          color="bg-[#8FECFF]"
          onTap={() => setLinkSymptomModal(true)}
        />
        {/* <Button
          label="View Linked"
          color="bg-[#8FECFF]"
          onTap={() => setSearchDiseaseModal(true)}
        /> */}
        {/* <Button
          label="Add Tab"
          color="bg-[#8FECFF]"
          onTap={() => setTabModal(true)}
        /> */}
      </div>
      <div className="flex justify-start mb-28 m-4 text-sm">
        {/* <Button
          label="Symptoms"
          selected={selected}
          color="bg-[#FFCF2E]"
          onTap={() => setSelected('Symptoms')}
        />
        <Button
          label="Diseases"
          selected={selected}
          color="bg-[#FFCF2E]"
          onTap={() => setSelected('Diseases')}
        />
        <Button
          label="Tabs"
          selected={selected}
          color="bg-[#FFCF2E]"
          onTap={() => setSelected('Tabs')}
        /> */}
      </div>

      <div className="w-full">
        <Box sx={{ height: "70vh", width: "100%" }}>
          <DataGrid
            rows={bodyParts}
            columns={columns}
            pageSize={20}
            rowsPerPageOptions={[5]}
            // checkboxSelection
            disableSelectionOnClick
            // getRowId={(row) => row._id}
          />
        </Box>
      </div>
      <ShowConnectedSymptoms
        bodyPart={selectedBodyPart}
        show={showDetailsModal}
        onHide={() => {
          setShowDetailsModal(false);
          getBodyParts();
        }}
      />
    </div>
  );
};

export default BodyParts;

// export async function getServerSideProps(context) {
//   const bodyResult = await BASE_URL.get("/body-symptom", {
//     headers: {
//       authorization: "Bearer " + getToken(context),
//     },
//   });
//   const bodyParts = await bodyResult.data;
//   console.log(bodyParts);

//   return { props: { bodyParts } };
// }

const ShowConnectedSymptoms = (props) => {
  console.log(props.bodyPart);
  const { bodyPart, ...rest } = props;

  const [linkedSymptoms, setLinkedSymptoms] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("access-token"));
    }
  }, []);
  const getBodyPartSymptoms = async () => {
    try {
      const res = await BASE_URL.post(
        "/symptomsByBodyPart",
        { b_ids: [bodyPart._id] },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
      console.log(res);
      setLinkedSymptoms(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getBodyPartSymptoms();
  }, [bodyPart]);

  const handleDelete = async (id) => {
    // const res = await BASE_URL.delete('body-symptom/' + bodyPart._id);
    const res = await BASE_URL.delete("/body-symptom?id=" + id);
    getBodyPartSymptoms();
    // const res1 = await BASE_URL.post(
    //   '/symptomsByBodyPart',
    //   { b_ids: [bodyPart._id] },
    //   {
    //     headers: {
    //       authorization: 'Bearer ' + token,
    //     },
    //   }
    // );
    // console.log(res1);
    // setLinkedSymptoms(res.data.data);
    // console.log(res);
  };

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
      <Modal.Body
      // style={{
      //   maxHeight: '100px',
      //   overflowY: 'auto',
      // }}
      >
        <div className="px-14">
          <div>
            <p className="mb-1 text-sm">Name</p>
            <p className="font-bold">{bodyPart.name}</p>
          </div>
          <div>
            <p className="text-sm mb-1">Linked Symptoms</p>
            <div className=" overflow-y-auto h-28">
              {linkedSymptoms.map((sym, i) => {
                return (
                  <div key={i} className="w-full flex justify-between">
                    <span className="font-semibold">{sym.name}</span>
                    <span
                      onClick={() => handleDelete(sym._id)}
                      className="cursor-pointer text-red-600"
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
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};
