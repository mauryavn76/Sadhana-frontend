import { request } from '../utils/request';

const AWARENESS_QUERY = `query MyQuery {
  awarenesspage {
    awarenessSection {
      background{
        hex
      }
      title
      image {
        url
      }
      content
    }
  }
}
`;

export async function getStaticProps() {
  const dataa = await request({
    query: AWARENESS_QUERY,
    variables: { limit: 10 },
  });
  return {
    props: { dataa },
  };
}

export default function Awareness({ dataa }) {
  return (
    <div>
      {dataa.awarenesspage.awarenessSection.map((con, k) => {
        return (
          <div className="flex justify-center items-center flex-col">
            <div className="w-[90%] xl:w-[90%] mt-10">
              <div className="flex flex-col">
                <div
                  key={k}
                  style={{ background: `${con.background.hex}` }}
                  className="p-4 my-6"
                >
                  <span className="text-3xl  font-semibold my-2">
                    {con.title}
                  </span>
                  <div className="flex justify-center items-center flex-col md:my-3 my-0">
                    <div>
                      <img
                        src={con.image.url}
                        className=" md:w-[100%] md:h-[70vh] h-[30vh]"
                      />
                    </div>
                  </div>
                  <div className="md:h-full h-[40vh] overflow-auto">
                    <p className=" px-2 mb-1">{con.content}</p>
                  </div>
                  <button className="bg-red-400 mt-4 float-right text-xs text-white font-sans px-2 py-2 lg:text-xl">
                    Know More
                  </button>
                  <div>
                    {`Homeopathy` === con.title ? (
                      <button className="bg-orange-500 mt-4 text-white px-3 py-1 text-base rounded-md hover:border-blue-600 border-solid">
                        Diagnose Disease
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
