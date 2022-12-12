import Modal from 'react-bootstrap/Modal';

const LogOutModal = () => {
  return (
    <>
      <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
        <Modal.Body>
          <Modal.Header closeButton />
          <div>
            <p className="mb-4">Are you sure you want to Log Out?</p>
            <div className="mx-auto flex justify-evenly">
              <button
                className="border-red-800 hover:text-white hover:bg-red-800 text-red-800 border-2 w-16"
                // onClick={logOut}
              >
                Yes
              </button>
              <button className="border-green-800 hover:text-white hover:bg-green-800 text-green-800 border-2 w-16">
                No
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LogOutModal;
