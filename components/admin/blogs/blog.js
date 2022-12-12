// import EditOffOutlinedIcon from '@mui/icons-material/EditOffOutlined';
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import Config from "../../../Config";
import { useRouter } from "next/router";

const Blog = ({
  title,
  desc,
  content,
  image,
  author,
  slug,
  date,
  onEdit,
  onDelete,
}) => {
  const router = useRouter();

  return (
    <div className="w-[80%] mx-auto my-4">
      {/* <div className=""> */}
      <div className="float-right font-medium p-3">
        <p>By Varun, {date.substring(0, 10)}</p>

        <div className="flex justify-center">
          <img
            className="h-28 rounded-xl w-28"
            src={Config.imageUrl + "/" + image}
          ></img>
          <div className=" flex flex-col pl-5 justify-around">
            <svg
              onClick={onEdit}
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
              onClick={onDelete}
              className="bg-gray-300 text-red-600 cursor-pointer  rounded-xl"
            />
          </div>
        </div>
      </div>
      <div className="h-52 p-4 rounded-lg shadow-xl border-1 border-solid">
        <h1
          onClick={() => router.push("/admin/blogs/" + slug)}
          className="text-2xl font-semibold cursor-pointer"
        >
          {title}
        </h1>
        <p className="text-sm">{desc}</p>
      </div>
      {/* </div> */}
    </div>
  );
};
export default Blog;
