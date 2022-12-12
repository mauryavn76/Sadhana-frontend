import axios from 'axios';
import Sidebar from '../../../components/admin/admin-sidebar';
import Button from '../../../components/multiusable/button';

import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import SymptomModal from '../../../components/admin/modals/symptons-modals';
import Diseasemodal from '../../../components/admin/modals/desease-modals';
import BASE_URL from '../../../utils/base-url';
import DiseaseTabModal from '../../../components/admin/modals/disease-tab-modal';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import LinkSymptomModal from '../../../components/admin/modals/link-symptom';
import LinkDiseaseModal from '../../../components/admin/modals/LinkDisease';
import Header from '../../../components/multiusable/header';
import { getToken } from '../../../utils/token';
const DiseaseTabs = () => {
  const [linksymptomModal, setLinkSymptomModal] = useState(false);
  const [linkDiseaseModal, setLinkDiseaseModal] = useState(false);
  const [searchdiseaseModal, setSearchDiseaseModal] = useState(false);
  const [diseaseModal, setDiseaseModal] = useState(false);
  const [muiSpinner, setShowMuiSpinner] = useState(false);
  const [tabModal, setTabModal] = useState(false);
  const [updatedTab, setUpdatedTab] = useState();
  const [tabs, setTabs] = useState([]);
  const getTabs = async () => {
    const res = await BASE_URL.get('/disease-tab');
    setTabs(res.data.data);
  };

  useEffect(() => {
    getTabs();
  }, []);

  console.log('tabs', tabs);

  useEffect(() => {
    tabs.map((tab) => {
      tab.created_at = new Date(tab.created_at).toLocaleDateString();
    });
  }, []);

  tabs.map((tab, index) => {
    tab['id'] = index + 1;
  });

  const renderTabButton = (params) => {
    return (
      <button
        className="text-blue-600 hover:underline border-0 font-semibold"
        onClick={() => {
          setTabModal(true);
          setUpdatedTab(params.row);
          // setLinkSymptomModal(true);
          // console.log(params);
        }}
      >
        more
      </button>
    );
  };

  const columnsTab = [
    {
      field: 'id',
      headerName: 'ID',
      width: 90,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'name',
      headerName: 'Name',
      // width: 150,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      // editable: true,
    },
    {
      field: 'added_by',
      headerName: 'By User',
      // width: 150,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      // editable: true,
    },
    {
      field: 'created_at',
      headerName: 'Added at',
      type: 'number',
      // width: 110,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      // editable: true,
    },
    {
      field: 'Options',
      headerName: 'Options',
      type: 'number',
      // width: 110,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: renderTabButton,
      // editable: true,
    },
  ];

  return (
    <div className="w-4/5">
      <DiseaseTabModal
        show={tabModal}
        onHide={() => {
          getTabs();
          setTabModal(false);
          setUpdatedTab('');
        }}
        setTab={setUpdatedTab}
        tab={updatedTab}
        setTabModal={setTabModal}
      />
      <Header title="Disease Details" />
      <div className="flex justify-end space-x-6 m-4 text-sm">
        <Button
          label="Add Tab"
          color="bg-[#8FECFF]"
          onTap={() => setTabModal(true)}
        />
      </div>

      <Box sx={{ height: '70vh', width: '100%' }}>
        <DataGrid
          rows={tabs}
          columns={columnsTab}
          pageSize={20}
          rowsPerPageOptions={[5]}
          // checkboxSelection
          disableSelectionOnClick
          // getRowId={(row) => row._id}
        />
      </Box>
    </div>
  );
};

export default DiseaseTabs;

// export async function getServerSideProps(context) {
// const tabResult = await BASE_URL.get('/disease-tab', {
//   headers: {
//     authorization: 'Bearer ' + getToken(context),
//   },
// });
// const tabs = await tabResult.data;
//   // console.log('tabs==', tab);

//   //   console.log(data);
//   return { props: { tabs } };
// }
