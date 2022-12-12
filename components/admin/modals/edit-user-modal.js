import React, { useState } from "react";
import Button from "../../multiusable/button";
import { useRouter } from "next/router";
import { ThreeDots } from "react-loader-spinner";
import DeleteModal from "./delete-modal";
import BASE_URL from "../../../utils/base-url";
import Modal from "react-bootstrap/Modal";
import { useEffect } from "react";
import TextInput from "../../multiusable/text-input";
import Textarea from "../../multiusable/text-area";
import TransparantButton from "../../multiusable/transparent-button";
import axios from "axios";
import LoaderFunction from "../../multiusable/loader";
import CloseIcon from "@mui/icons-material/Close";

const EditUserModal = (props) => {
  const [isDelete, setIsDelete] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { setUserModal, user, setUser, ...rest } = props;
  const [updatedUser, setUpdatedUser] = useState("");
  const [muiSpinner, setShowMuiSpinner] = useState("");
  const [updateError, setUpdateError] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);

  const router = useRouter();

  console.log(rest);
  console.log(user);

  useEffect(() => {
    setFirstName(user?.full_name?.split(" ")[0]);
    setLastName(user?.full_name?.split(" ")[1]);
    setEmail(user?.email);
    setPhone(user?.phone);
    setIsAdmin(user?.isAdmin == "admin" ? true : false);
  }, [user]);

  //   console.log(updateUser);
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const validate = () => {
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
    if (phone.length === 0) {
      errors.phoneError = "Please enter Phone Number";
    }
    return errors;
  };

  const updateUser = async (e) => {
    e.preventDefault();
    setErrors(validate());
    setIsSubmit(true);
  };

  console.log("user", props.user);

  const deleteUser = async () => {
    try {
      setShowMuiSpinner(true);
      const res = await BASE_URL.delete("/user?id=" + props.user._id);
      setUserModal(false);
      console.log(res);
      props.onHide();

      setShowMuiSpinner(false);
      setUser("");
    } catch (err) {
      console.log(err);
      setShowMuiSpinner(false);
    }
  };

  useEffect(() => {
    const updateUser = async () => {
      if (isSubmit) {
        if (Object.keys(errors).length > 0) {
          return;
        } else {
          try {
            setShowMuiSpinner(true);
            const toUpdateUser = {
              id: props.user._id,
              full_name: firstName + " " + lastName,
              // last_name: updatedLastName,
              email: email,
              phone: phone,
              role: isAdmin ? "admin" : "user",
            };
            console.log(toUpdateUser);
            const res = await BASE_URL.put("user", toUpdateUser);
            setUserModal(false);
            console.log(res);
            // refreshData();
            // setSpinner(false);
            props.onHide();
            setUpdatedUser("");
            refreshData();
            setShowMuiSpinner(false);
            setUser("");
          } catch (err) {
            console.log(err);
            setUpdateError(err?.response?.data?.message);
          }
        }
      }
    };
    updateUser();
  }, [errors, isSubmit]);

  return (
    <Modal
      {...rest}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <Modal.Header closeButton />
        <div className="px-14 py-4">
          <h1 className="font-bold text-2xl text-center">
            {user ? "User Details" : ""}
            {updateError}
          </h1>
          <div className="mt-8 ">
            <div className="my-2">
              <label className="font-semibold">First Name</label>
              <TextInput value={firstName} onChange={setFirstName} />
              <p className="text-[#E50000] text-sm m-0">
                {errors.firstNameError}
              </p>
            </div>

            <div className="my-2">
              <label className="font-semibold">Last Name</label>
              <TextInput value={lastName} onChange={setLastName} />
              <p className="text-[#E50000] text-sm m-0">
                {errors.lastNameError}
              </p>
            </div>

            <div className="my-2">
              <label className="font-semibold">Email</label>
              <TextInput value={email} onChange={setEmail} />
              <p className="text-[#E50000] text-sm m-0">{errors.emailError}</p>
            </div>

            <div className="my-2">
              <label className="font-semibold">Mobile Number</label>
              <TextInput type={"number"} value={phone} onChange={setPhone} />
              <p className="text-[#E50000] text-sm m-0">{errors.phoneError}</p>
            </div>
          </div>

          <div className="flex space-x-2 mt-3 items-center ">
            <input
              className="bg-[#63FFFD] mb-3"
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => {
                e.target.checked ? setIsAdmin(true) : setIsAdmin(false);
              }}
            />
            <p>Is Admin ?</p>
          </div>

          <div className="float-right h-24 flex justify-between flex-col mt-5">
            <Button
              label={user ? "Update" : ""}
              onTap={(e) => {
                user ? updateUser(e) : "";
              }}
              color="bg-[#8FECFF]"
            />
            {user && (
              <TransparantButton
                label="Delete"
                onTap={() => {
                  setIsDelete(true);
                }}
                color="text-[#FF3535]"
                border="border-[#FF3535]"
              />
            )}
          </div>
        </div>
        {muiSpinner && (
          <div className="fixed flex justify-center items-center left-0 bg-black opacity-70 top-0 w-full h-full">
            <LoaderFunction height="100" width="100" />
          </div>
        )}
        <DeleteModal
          deleteUser={deleteUser}
          setIsDelete={setIsDelete}
          muiSpinner={muiSpinner}
          show={isDelete}
          onHide={() => setIsDelete(false)}
          backdrop="static"
          keyboard={false}
        />
        {/* )} */}
      </Modal.Body>
    </Modal>
  );
};

export default EditUserModal;
