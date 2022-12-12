// import EditOffOutlinedIcon from '@mui/icons-material/EditOffOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import BASE_URL from '../../../utils/base-url';
import TextInput from '../../multiusable/text-input';
import { useRouter } from 'next/router';
import COnfig from '../../../Config';

const Disease = ({ disease, onDelete, onUpdate }) => {
  const router = useRouter();
  return (
    <div className="w-[80%] h-max mx-auto my-4">
      {/* <div className=""> */}

      <div className="float-right font-medium p-3">
        <p> { }</p>

        <div className="flex justify-start items-end h-48 py-3">
          <img
            className="h-36 rounded-xl w-32"
            src={COnfig.imageUrl + '/' + disease.image}
          ></img>
          <div className=" flex flex-col pl-3 justify-between py-20 space-y-3">
            <svg
              onClick={onUpdate}
              xmlns="http://www.w3.org/2000/svg"
              className="bg-gray-300 cursor-pointer rounded-full text-[#0066FF] h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            <DeleteForeverOutlinedIcon
              onClick={() => onDelete(disease.slug)}
              className="bg-gray-300 text-red-600 cursor-pointer  rounded-xl"
            />
          </div>
        </div>
      </div>
      <div className="h-56 p-4 rounded-lg shadow-xl border-1 border-solid">
        <div className="flex space-x-9">
          <span>
            <span className="font-medium">By:</span> {disease.added_by} ,{' '}
            <span className="font-medium">Date: </span>
            {disease.created_at.substring(0, 10)}
          </span>
        </div>
        <h1
          onClick={() => router.push('/Application/' + disease.d_id)}
          className="text-2xl mt-2 cursor-pointer font-semibold"
        >
          {disease.title}
        </h1>
        <div className="w-[70%]">
          <p className="text-sm">
            Blog Description Lorem Ipsum is simply dummy text of the printing
            and typesetting industry. Lorem Ipsum has been the industrys
            standard dummy text
          </p>
          <p className="text-sm">
            Blog Content Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industrys standard
            dummy text
          </p>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};
export default Disease;
