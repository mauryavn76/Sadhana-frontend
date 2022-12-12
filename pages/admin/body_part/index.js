import React, { useEffect } from 'react';
import { useState } from 'react';
import BodyModal from '../../../components/admin/modals/bodymodals';
import Button from '../../../components/multiusable/button';
import BASE_URL from '../../../utils/base-url';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import Header from '../../../components/multiusable/header';
import { Cookies } from 'react-cookie';
import { getToken } from '../../../utils/token';
const BodyPart = ({ bodyparts }) => {
  const [showBodyModal, setShowBodyModal] = useState(false);

  const [updatedBodypart, setUpdatedBodypart] = useState();
  console.log(bodyparts);

  // bodyparts.createdAt = bodyparts.created_at.toLocaleString();

  // bodyparts.created_at =
  useEffect(() => {
    bodyparts.data.map((bodyPart) => {
      bodyPart.created_at = new Date(bodyPart.created_at).toLocaleDateString();
    });
  }, []);
  bodyparts.data.map((bodyPart, index) => {
    bodyPart['id'] = index + 1;
  });
  // alert(bodyparts.toLocaleString());

  const renderDetailsButton = (params) => {
    return (
      <button
        className="text-blue-600 hover:underline font-semibold"
        onClick={() => {
          setUpdatedBodypart(params.row);
          setShowBodyModal(true);
          // console.log(params);
        }}
      >
        more
      </button>
    );
  };

  const columns = [
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
      renderCell: renderDetailsButton,
      // editable: true,
    },
  ];

  return (
    <>
      <BodyModal
        show={showBodyModal}
        onHide={() => {
          setShowBodyModal(false);
          setUpdatedBodypart('');
        }}
        bodyPart={updatedBodypart}
        setShowBodyModal={setShowBodyModal}
      />
      <div className="w-4/5">
        <Header title={'Body Part'} />
        <div className="flex justify-end space-x-6 m-4 text-sm">
          <Button
            label="Add Body Part"
            color="bg-[#8FECFF]"
            onTap={() => setShowBodyModal(true)}
          />
        </div>
        <div className="px-8">
          <Box sx={{ height: '70vh', width: '100%' }}>
            <DataGrid
              rows={bodyparts.data}
              columns={columns}
              pageSize={20}
              rowsPerPageOptions={[5]}
              // checkboxSelection
              // disableSelectionOnClick
              // getRowId={(row) => row._id}
            />
          </Box>
        </div>
        {/* <table className="w-full border-b-2">
          <thead>
            <tr>
              <th>Name</th>
              <th>By User</th>
              <th>Added at</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {bodyparts.data.map((x, index) => {
              return (
                <tr key={index} className="text-center py-2 border-y-2">
                  <td className="py-2">{x.name}</td>
                  <td>{x.created_by}</td>
                  <td>{x.created_at}</td>
                  <td>
                    <span
                      onClick={() => {
                        setUpdatedBodypart(x);
                        setShowBodyModal(true);
                      }}
                      className="text-[#0066FF]"
                    >
                      more
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table> */}
      </div>
      {/* {showBodyModel && ( */}

      {/* )} */}
    </>
  );
};

export async function getServerSideProps(context) {
  // const cookie = context.req;
  // let token = cookie.cookies['access-token'];
  // const cookie = new Cookies();
  // let token = cookie.get('access-token');
  const bodypartResult = await BASE_URL.get('/bodyparts', {
    headers: {
      // authorization: 'Bearer ' + token,
      authorization: 'Bearer ' + getToken(context),
    },
  });
  // console.log(token);
  const bodyparts = await bodypartResult.data;
  console.log(bodyparts);

  // console.log(data);
  return { props: { bodyparts } };
}

export default BodyPart;
