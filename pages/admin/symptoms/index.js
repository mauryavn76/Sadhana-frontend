import axios from "axios";
import Sidebar from "../../../components/admin/admin-sidebar";
import Button from "../../../components/multiusable/button";
import { useEffect, useState } from "react";
import SymptomModal from "../../../components/admin/modals/symptons-modals";
import Diseasemodal from "../../../components/admin/modals/desease-modals";
import BASE_URL from "../../../utils/base-url";
import DiseaseTabModal from "../../../components/admin/modals/disease-tab-modal";
import Box from "@mui/material/Box";
import Header from "../../../components/multiusable/header";
import { DataGrid } from "@mui/x-data-grid";
import MedicineModal from "../../../components/admin/modals/medicine-modal";
const GetSymptoms = ({ disease, symptom, tab }) => {
  const [symptoms, setSymptoms] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [symptomModal, setSymptomModal] = useState(false);
  const [diseaseModal, setDiseaseModal] = useState(false);
  const [medicineModal, setMedicineModal] = useState(false);
  const [tabModal, setTabModal] = useState(false);
  const [selected, setSelected] = useState("Symptoms");
  const [updatedSymptom, setUpdatedSymptom] = useState();
  const [updatedDisease, setUpdatedDisease] = useState();
  const [updatedTab, setUpdatedTab] = useState();

  const getSymptoms = async () => {
    const res = await BASE_URL.get("/symptom");
    setSymptoms(res.data.data);
  };

  const getDiseases = async () => {
    const res = await BASE_URL.get("/disease");
    setDiseases(res.data.data);
  };

  useEffect(() => {
    getSymptoms();
    getDiseases();
  }, []);

  useEffect(() => {
    symptoms.map((symptom) => {
      symptom.created_at = new Date(symptom.created_at).toLocaleDateString();
    });
    diseases.map((disease) => {
      disease.created_at = new Date(disease.created_at).toLocaleDateString();
    });
  }, []);

  symptoms.map((symptom, index) => {
    symptom["id"] = index + 1;
  });
  diseases.map((symptom, index) => {
    symptom["id"] = index + 1;
  });

  const renderSymptomButton = (params) => {
    return (
      <button
        className="text-blue-600 hover:underline font-semibold"
        onClick={() => {
          setUpdatedSymptom(params.row);
          setSymptomModal(true);
          // console.log(params);
        }}
      >
        more
      </button>
    );
  };
  const renderDiseaseButton = (params) => {
    return (
      <button
        className="text-blue-600 hover:underline font-semibold"
        onClick={() => {
          setUpdatedDisease(params.row);
          setDiseaseModal(true);
          // console.log(params);
        }}
      >
        more
      </button>
    );
  };

  const columnsSymptom = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      headerAlign: "center",
      hide: true,
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
      headerAlign: "center",
      align: "center",
      // width: 150,
      flex: 1,
      // editable: true,
    },
    {
      field: "Options",
      headerName: "Options",
      type: "number",
      // width: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: renderSymptomButton,
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
  const columnsDisease = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      hide: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: "Name",
      // width: 90,
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
      renderCell: renderDiseaseButton,
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

  const columnMedicine =[
    {
      field: "id",
      headerName: "ID",
      width: 90,
      hide: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: "Name",
      // width: 90,
      flex: 1,
      headerAlign: "center",
      align: "center"
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
      // renderCell: renderDiseaseButton,
      // editable: true,
    },
  ]

  console.log(updatedSymptom);

  return (
    <div className="w-4/5">
      <Header title="Symptoms" />
      <SymptomModal
        show={symptomModal}
        onHide={() => {
          getSymptoms();
          setSymptomModal(false);
          setUpdatedSymptom();
          console.log(updatedSymptom);
        }}
        setSymptomModal={setSymptomModal}
        symptom={updatedSymptom}
        setSymptom={setUpdatedSymptom}
      />

      <Diseasemodal
        show={diseaseModal}
        onHide={() => {
          getDiseases();
          setDiseaseModal(false);
          setUpdatedDisease("");
        }}
        setDisease={setUpdatedDisease}
        disease={updatedDisease}
        setDiseaseModal={setDiseaseModal}
      />

      <MedicineModal
      show={medicineModal}
      onHide={() => {
        getDiseases();
        setMedicineModal(false)
        setUpdatedDisease("")
      }}
      setDisease={setUpdatedDisease}
      disease={updatedDisease}
      setMedicineModal={setMedicineModal}
       />

      <div className="flex justify-end space-x-6 m-4 text-sm">
        <Button
          label="Add Symptom"
          color="bg-[#8FECFF]"
          onTap={() => setSymptomModal(true)}
        />
        <Button
          label="Add Disease"
          color="bg-[#8FECFF]"
          onTap={() => setDiseaseModal(true)}
        />
        <Button
          label="Add Medicine"
          color="bg-[#8FECFF]"
          onTap={() => setMedicineModal(true)}
        />
      </div>
      <div className="flex justify-start m-4 text-sm">
        <Button
          label="Symptoms"
          selected={selected}
          color="bg-[#FFF4CD]"
          onTap={() => setSelected("Symptoms")}
        />
        <Button
          label="Diseases"
          selected={selected}
          color="bg-[#FFF4CD]"
          onTap={() => setSelected("Diseases")}
        />
        <Button
        label="Medicines"
        selected={selected}
        color="bg-[#FFF4CD]"
        onTap={() => setSelected("Medicines")}
        />
      </div>

      <div className="w-full px-8">
        {selected == "Symptoms" && (
          <Box sx={{ height: "70vh", width: "100%" }}>
            <DataGrid
              rows={symptoms}
              columns={columnsSymptom}
              pageSize={20}
              rowsPerPageOptions={[5]}
              // checkboxSelection
              disableSelectionOnClick  
              // getRowId={(row) => row._id}
            />
          </Box>
        )}
        {selected === "Diseases" && (
          <Box sx={{ height: "70vh", width: "100%" }}>
            <DataGrid
              rows={diseases}
              columns={columnsDisease}
              pageSize={20}
              rowsPerPageOptions={[5]}
              // checkboxSelection
              disableSelectionOnClick
              // getRowId={(row) => row._id}
            />
          </Box>
        )}
        {
          selected === "Medicines" && (
            <Box sx={{ height: "70vh", width: "100%" }}>
            <DataGrid
              rows={medicines}
              columns={columnMedicine}
              pageSize={20}
              rowsPerPageOptions={[5]}
              // checkboxSelection
              disableSelectionOnClick
              // getRowId={(row) => row._id}
            />
          </Box>
          )
        }
      </div>
    </div>
  );
};

export default GetSymptoms;

export async function getServerSideProps(context) {
  const diseaseResult = await BASE_URL.get("/disease");
  const disease = await diseaseResult.data;
  // console.log(disease);

  const symptomResult = await BASE_URL.get("/symptom");
  const symptom = await symptomResult.data;

  // console.log('tabs==', tab);

  //   console.log(data);
  return { props: { disease, symptom } };
}
