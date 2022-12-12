import { useEffect, useState } from "react";
import BASE_URL from "../../../utils/base-url";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../../components/multiusable/header";
import EditUserModal from "../../../components/admin/modals/edit-user-modal";

const GetUsers = () => {
  const [userModal, setUserModal] = useState(false);
  const [updatedUser, setUpdatedUser] = useState();
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const res = await BASE_URL.get("/user");
      setUsers(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    users.map((d, index) => {
      d["id"] = index + 1;
    });
  }, []);

  const renderUpdateButton = (params) => {
    return (
      <button
        className="text-blue-600 hover:underline font-semibold"
        onClick={() => {
          setUpdatedUser(params.row);
          setUserModal(true);
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
      hide: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "full_name",
      headerName: "Name",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "email",
      headerName: "Email",
      type: "number",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "phone",
      headerName: "Mobile Number",
      type: "number",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "role",
      headerName: "Is Admin",
      type: "text",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <p>{params.row.isAdmin == "admin" ? "Admin" : "User"}</p>
      ),
    },
    {
      field: "Options",
      headerName: "Options",
      type: "text",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: renderUpdateButton,
    },
  ];

  return (
    <>
      <EditUserModal
        show={userModal}
        onHide={() => {
          setUserModal(false);
          getUsers();
          setUpdatedUser("");
        }}
        setUserModal={setUserModal}
        user={updatedUser}
        setUser={setUpdatedUser}
      />
      <div className="w-4/5">
        <Header title="Manage User & Roles" />
        <div className="flex justify-end space-x-6 m-4 text-sm"></div>
        <Box sx={{ height: "70vh", width: "100%" }}>
          <DataGrid
            rows={users}
            columns={columns}
            pageSize={20}
            getRowId={(row) => row._id}
          />
        </Box>
      </div>
    </>
  );
};

export default GetUsers;
