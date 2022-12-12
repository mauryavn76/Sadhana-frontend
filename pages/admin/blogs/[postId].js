import editorjsHTML from "editorjs-html";
import BASE_URL from "../../../utils/base-url";
import { stateToHTML } from "draft-js-export-html";
import draftToHtml from "draftjs-to-html";
import { convertToHTML, convertFromHTML } from "draft-convert";
import DOMPurify from "isomorphic-dompurify";
const SinglePost = ({ blog }) => {
  const bodyData = blog.data[0].data;
  console.log(blog);
  const body = draftToHtml(bodyData);
  // '\''
  console.log("body========", body);
  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  return (
    <div
      className="h-max py-6 px-40"
      dangerouslySetInnerHTML={createMarkup(body)}
    ></div>
  );
};
export default SinglePost;
export async function getServerSideProps(context) {
  const title = context.params.postId;
  console.log("===========", title);
  const blogData = await BASE_URL.get("/blog/" + title);
  console.log(blogData.data);
  const blog = await blogData.data;

  return {
    props: {
      blog,
    },
  };
}
