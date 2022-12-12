import axios from "axios";
import { useState, useEffect } from "react";
import Button from "../../multiusable/button";
import { useRouter } from "next/router";
import { Circles, BallTriangle, ThreeDots } from "react-loader-spinner";
import DeleteModal from "../modals/delete-modal";
import Tost from "../modals/tost";
import BASE_URL from "../../../utils/base-url";
import Header from "../../multiusable/header";
import TextInput from "../../multiusable/text-input";
import LoaderFunction from "../../multiusable/loader";
import * as React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Userform = ({ user, setUserModal }) => {
  const [muiSpinner, setShowMuiSpinner] = useState(false);
  const [createError, setCreateError] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [firstName, setFirstName] = useState(user ? user.full_name : "");
  const [lastName, setLastName] = useState(user ? user.full_name : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [mobile, setMobile] = useState(user ? user.phone : "");
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState(user ? user.password : "");
  // const [userIsAdmin, setUserIsAdmin] = useState(user ? user.isAdmin : "");

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [errorModal, setErrorModal] = useState(false);

  const [isSubmit, setIsSubmit] = useState(false);

  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const validate = () => {
    // e.preventDefault();
    let errors = {};

    if (firstName.length === 0) {
      errors.firstNameError = "Please enter first name";
    }
    if (lastName.length === 0) {
      errors.lastNameError = "Please enter last name";
    }
    if (email.length === 0) {
      errors.emailError = "Please enter Email";
    }
    if (mobile.length === 0) {
      errors.mobileError = "Please enter mobile";
    }
    if (password.length === 0) {
      errors.passwordError = "Please enter Password";
    }
    return errors;
  };

  const toastModal = () => {
    toast("User Added Successfully!", {
      position: "top-center",
      color: "black",
    });
  };

  console.log("IsAdmin", isAdmin);

  const handlePost = async (e) => {
    e.preventDefault();
    setErrors(validate());
    setIsSubmit(true);
  };

  useEffect(() => {
    const createUser = async () => {
      if (isSubmit) {
        if (Object.keys(errors).length > 0) {
          return;
        } else {
          setShowMuiSpinner(true);
          // setSpinner(true);
          const newUser = {
            full_name: firstName + " " + lastName,
            email: email,
            phone: mobile,
            password: password,
            role: isAdmin ? "admin" : "user",
          };

          try {
            const res = await BASE_URL.post("/user", newUser);
            console.log(res);
            toastModal();
            setFirstName("");
            setLastName("");
            setEmail("");
            setMobile("");
            setPassword("");
            setShowMuiSpinner(false);
          } catch (err) {
            setShowMuiSpinner(false);
            setCreateError(err.response.data.message);
            setFirstName("");
            setLastName("");
            setEmail("");
            setMobile("");
            setPassword("");
          }
        }
      }
    };
    createUser();
  }, [isSubmit, errors]);

  return (
    <>
      <div className="w-full h-full">
        <Header title="Add New User" />

        {/* <errorModal
          show={errorModal}
          onHide={() => {
            setErrorModal(false);
          }}
          setErrorModal={setErrorModal}
        /> */}
        <div className="flex flex-col justify-center items-center">
          {user && (
            <span className="right-5 top-3">
              (
              <i
                onClick={() => setUserModal(false)}
                className="fa-solid fa-xmark"
              ></i>
              )
            </span>
          )}
          <h1 className="text-2xl my-4 text-center">
            {user ? "Error User" : "New User"}
          </h1>
          {/* {success && <Tost setSuccess={setSuccess} />} */}
          {/* {failed && <Tost />} */}
          <p className="text-[#E50000] text-sm m-0">{createError}</p>
          <form className="w-96">
            <p className="m-0 p-0">First Name</p>
            <TextInput value={firstName} onChange={setFirstName} />
            <p className="text-[#E50000] text-sm m-0">
              {errors.firstNameError}
            </p>
            <div className="pt-4">
              <p className="m-0 p-0">Last Name</p>
              <TextInput value={lastName} onChange={setLastName} />
              <p className="text-[#E50000] text-sm m-0">
                {errors.lastNameError}
              </p>
            </div>
            <div className="pt-4">
              <p className="m-0 p-0">Email</p>
              <TextInput value={email} onChange={setEmail} type={"email"} />
              <p className="text-[#E50000] text-sm m-0">{errors.emailError}</p>
            </div>
            <div className="pt-4">
              <p className="m-0 p-0">Mobile Number</p>
              <TextInput value={mobile} onChange={setMobile} type={"number"} />
              <p className="text-[#E50000] text-sm m-0">{errors.mobileError}</p>
            </div>
            <div className="pt-4">
              <p className="m-0 p-0">Password</p>
              <TextInput
                value={password}
                onChange={setPassword}
                // type={'password'}
              />
              <p className="text-[#E50000] text-sm m-0">
                {errors.passwordError}
              </p>
            </div>
            <div className="flex space-x-2 items-center">
              <input
                className="bg-[#63FFFD] mb-3 cursor-pointer"
                type="checkbox"
                // checked={isAdmin}
                value={isAdmin}
                onChange={(e) => {
                  e.target.checked ? setIsAdmin(true) : setIsAdmin(false);
                }}
              />
              <p className="py-3">Is Admin ?</p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={(e) => {
                  handlePost(e);
                  // toastModal();
                  // validate(e);
                }}
                className="bg-[#8FECFF] px-4 font-bold py-2 "
              >
                {user ? "Update User" : "Add User"}
              </button>
            </div>
            <div className="flex justify-end">
              {user && (
                <button
                  onClick={() => setIsDelete(true)}
                  className="border-2 border-red-700 bg-[] px-9 text-red-800"
                >
                  {/* {user ? "Delete User" : "Add User"} */}
                  Delete
                </button>
              )}
            </div>
          </form>
        </div>
        {muiSpinner && (
          <div className="fixed flex justify-center items-center left-0 bg-black opacity-70 top-0 w-full h-full">
            <LoaderFunction height="100" width="100" />
          </div>
        )}
        {isDelete && (
          <DeleteModal
            handleDelete={handleDelete}
            setIsDelete={setIsDelete}
            // spinner={spinner}
            muiSpinner={muiSpinner}
          />
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default Userform;

{
  /* <div className="w-full">
<Header title="Add New User" />
<div className="flex justify-center items-center h-[100vh]">
  <div className="relative">
    {user && (
      <span className="absolute right-5 top-3">
        (
        <i
          onClick={() => setUserModal(false)}
          className="fa-solid fa-xmark"
        ></i>
        )
      </span>
    )}
    <h1 className="text-3xl text-center">
      {user ? 'Update User' : 'New User'}
    </h1>
    {success && <Tost setSuccess={setSuccess} />}
    {failed && <Tost />}
    <p className="m-0 p-0">First Name</p>
    {/* <TextInput value={userFirstName} onChange={setUserFirstName} /> */
}
//     <input
//       required
//       className="border-2 w-96 "
//       type="text"
//       name="FirstName"
//       value={user ? userFirstName : firstName}
//       onChange={(e) => {
//         user
//           ? setUserFirstName(e.target.value)
//           : setFirstName(e.target.value);
//       }}
//     />
//     <p className={`${!firstNameError && 'invisible'} text-red-800`}>
//       Please enter firstname
//     </p>
//     <p>Last Name</p>
//     <input
//       className="border-2 w-96"
//       type="text"
//       name="LastName"
//       value={user ? userFullName : fullName}
//       onChange={(e) => {
//         user
//           ? setUserFullName(e.target.value)
//           : setFullName(e.target.value);
//       }}
//     />
//     <p className={`${!lastNameError && 'invisible'} text-red-800`}>
//       Please enter Last Name
//     </p>
//     <p className="m-0 p-0">Email</p>{' '}
//     <input
//       className="border-2 h-9 w-96"
//       type="text"
//       name="Email"
//       value={user ? userEmail : email}
//       onChange={(e) => {
//         user ? setUserEmail(e.target.value) : setEmail(e.target.value);
//       }}
//     />
//     <p className={`${!emailError && 'invisible'} text-red-800`}>
//       Please enter email
//     </p>
//     <p className="m-0 p-0">Mobile Number</p>
//     <input
//       className="border-2 h-9 w-96"
//       type="number"
//       name="MobileNumber"
//       value={user ? userMobile : mobile}
//       onChange={(e) => {
//         user
//           ? setUserMobile(e.target.value)
//           : setMobile(e.target.value);
//       }}
//     />
//     <p className={`${!mobileError && 'invisible'} text-red-800`}>
//       Please enter Mobile Number
//     </p>
//     <p className="m-0 p-0">Password</p>
//     <input
//       className="border-2 h-9 w-96"
//       type="password"
//       name="Password"
//       value={user ? userPassword : password}
//       onChange={(e) => {
//         user
//           ? setUserPassword(e.target.value)
//           : setPassword(e.target.value);
//       }}
//     />
//     <p className={`${!passwordError && 'invisible'} text-red-800`}>
//       Please enter Password
//     </p>
//     <div className="flex space-x-2 items-center ">
//       <input
//         className="bg-[#63FFFD] mb-3"
//         type="checkbox"
//         checked={isAdmin}
//         onChange={(e) => {
//           user ? setUserIsAdmin(!userIsAdmin) : setIsAdmin(!isAdmin);
//         }}
//       />
//       <p>Is Admin ?</p>
//     </div>
//     <div className="flex justify-end">
//       <button
//         onClick={user ? handlePut : handlePost}
//         className="bg-[#8FECFF] px-4 py-2 "
//       >
//         {user ? 'Update User' : 'Add User'}
//       </button>
//     </div>
//     <div className="flex justify-end">
//       {user && (
//         <button
//           onClick={() => setIsDelete(true)}
//           className="border-2 border-red-700 bg-[] px-9 text-red-800"
//         >
//           {/* {user ? "Delete User" : "Add User"} */}
//           Delete
//         </button>
//       )}
//     </div>
//   </div>
// </div>
// {spinner && (
//   <div className="fixed flex justify-center items-center left-0 top-0 w-full h-full">
//     <ThreeDots
//       height="100"
//       width="100"
//       color="grey"
//       ariaLabel="loading"
//     />
//   </div>
// )}
// {isDelete && (
//   <DeleteModal
//     handleDelete={handleDelete}
//     setIsDelete={setIsDelete}
//     spinner={spinner}
//   />
// )}
// </div> */}
