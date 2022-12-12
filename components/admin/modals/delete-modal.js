import Button from "../../multiusable/button";
import { Circles, BallTriangle, ThreeDots } from "react-loader-spinner";
// import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";

// ({

// }
const DeleteModal = ({
  show,
  onHide,
  // handleDelete,
  deleteUser,
  deleteBodyPart,
  deleteSymptom,
  deleteDisease,
  setIsDelete,
  spinner,
  blog,
  handleBodyPartDelete,
}) => {
  const handleShow = () => setShow(true);

  const handleDeleteModal = () => {
    deleteBodyPart && deleteBodyPart();
    deleteSymptom && deleteSymptom();
    deleteUser && deleteUser();
    deleteDisease && deleteDisease();
    onHide();
  };

  return (
    <>
      <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
        <Modal.Body>
          <Modal.Header closeButton />
          <div>
            <p className="mb-4">Are you sure you want to delete?</p>
            <div className="mx-auto flex justify-evenly">
              <button
                className="border-red-800 hover:text-white hover:bg-red-800 text-red-800 border-2 w-16"
                onClick={handleDeleteModal}
              >
                Yes
              </button>
              <button
                className="border-green-800 hover:text-white hover:bg-green-800 text-green-800 border-2 w-16"
                onClick={() => setIsDelete(false)}
              >
                No
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default DeleteModal;
