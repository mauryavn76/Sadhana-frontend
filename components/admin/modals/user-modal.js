import Userform from '../forms/user-form';
const UserModal = ({ user, setUserModal }) => {
  return (
    <>
      <div className="fixed right-0 top-0 w-full h-full flex justify-center bg-black bg-opacity-30">
        <div className="bg-white w-max">
          <Userform user={user} setUserModal={setUserModal} />
        </div>
      </div>
    </>
  );
};
export default UserModal;
