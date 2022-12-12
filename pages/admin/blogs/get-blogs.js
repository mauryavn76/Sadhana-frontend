import BASE_URL from "../../../utils/base-url";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import DeleteModal from "../../../components/admin/modals/delete-modal";
// import ReactPaginate from "react-paginate";
// import Header from "../../../components/multiusable/header";
import Header from "../../../components/multiusable/header";

import Blog from "../../../components/admin/blogs/blog";
import { getToken } from "../../../utils/token";
const GetAllBlogs = () => {
  const router = useRouter();
  const [isDelete, setIsDelete] = useState(false);
  const [blog, setBlog] = useState();
  // const [muiSpinner, setShowMuiSpinner] = useState();
  const [spinner, setSpinner] = useState(false);
  const [blogs, setBlogs] = useState([]);
  // console.log(blogs);
  const getBlogs = async () => {
    const res = await BASE_URL.get("/blog");
    setBlogs(res.data.data);
    console.log(res.data);
  };
  useEffect(() => {
    getBlogs();
  }, []);

  //PAGINATION
  const [pageNumber, setPageNumber] = useState(0);
  let BlogsPerPage = 2;
  let BlogsVisited = BlogsPerPage * pageNumber;

  let blogPageCount = Math.ceil(blogs.length / BlogsPerPage);

  const blogPageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  const blogDelete = async (slug) => {
    try {
      const res = await BASE_URL.delete("/blog/" + slug);
      getBlogs();
    } catch (err) {
      console.log(err);
    }
  };

  // const router = useRouter() 

  // const displayBlogs = blogs
  //   .slice(BlogsVisited, BlogsVisited + BlogsPerPage)
  // .map((blog) => {
  //   return (
  //     <Blog
  //       key={blog._id}
  //       onEdit={() => {
  //         console.log("edit");
  //       }}
  //       desc={blog.description}
  //       onDelete={() => blogDelete(blog.slug)}
  //       image={blog.image}
  //       title={blog.title}
  //       date={new Date(blog.created_at).toLocaleDateString()}
  //     />
  //   );
  // });
  return (
    <>
      <div className="w-4/5">
        <Header title="All Blogs" />

        <div className="h-[80vh] overflow-y-auto">
          {blogs?.map((blog) => {
            return (
              <Blog
                key={blog._id}
                onEdit={() => {
                  // console.log("edit");
                  router.push(`/admin/blogs/edit/${blog.slug}`)

                }}
                author={blog.created_by}
                slug={blog.slug}
                desc={blog.description}
                image={blog.image}
                onDelete={() => blogDelete(blog.slug)}
                title={blog.title}
                date={blog.created_at}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
export default GetAllBlogs;
