// import { AwarenessData } from '../data/awarenessData';
import { request } from '../utils/request';

const AWARENESS_QUERY = `query MyQuery {
  awareness {
    content
    title
    background {
      hex
    }
    image {
      url
    }
  }
}
`;

export async function getStaticProps() {
  const data1 = await request({
    query: AWARENESS_QUERY,
    variables: { limit: 10 },
  });
  return {
    props: { data1 },
  };
}

export default function Awareness({ data1 }) {
  console.log(data1, 'bdjewjdjnewsydebbydw');
  return (
    <div className="flex justify-center">
      <div className="w-[90%] xl:w-[90%] mt-10">
        <div className="flex flex-col">
          <div
            style={{ background: `${data1.awareness.background.hex}` }}
            className="p-4 my-6"
          >
            <span className="text-3xl  font-semibold my-2">
              {data1.awareness.title}
            </span>
            <div className="flex justify-center items-center flex-col md:my-3 my-0">
              <div>
                <img
                  src={data1.awareness.image[0].url}
                  className=" md:w-[100%] md:h-[70vh] h-[30vh]"
                />
              </div>
            </div>
            <div className="md:h-full h-[40vh] overflow-auto">
              <p className=" px-2 mb-1">{data1.awareness.content}</p>
            </div>
            <button className="bg-red-400 mt-4 float-right text-xs text-white font-sans px-2 py-2 lg:text-xl">
              Know More
            </button>
            <div>
              {/* {`Homeopathy` == data.title ? ( */}
              <button className="bg-orange-500 mt-4 text-white px-3 py-1 text-base rounded-md hover:border-blue-600 border-solid">
                Diagnose Disease
              </button>
              {/* ) : null} */}
            </div>
          </div>
          );
        </div>
      </div>
    </div>
  );
}
