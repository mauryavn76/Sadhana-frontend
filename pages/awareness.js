import { AwarenessData } from "../data/awarenessData";

const Awareness = () => {
  return (
    <div className="flex justify-center">
      <div className="w-[90%] xl:w-[90%] mt-10">
        <div className="flex flex-col gap-3">
          {AwarenessData.map((data) => {
            return (
              <div style={{ background: `${data.bgColor}` }} className="p-4">
                <span className="text-3xl  font-semibold my-2">
                  {data.title}
                </span>
                <div className="flex justify-center items-center flex-col md:my-3 my-0">
                  <div>
                    <img
                      src={data.img}
                      className=" md:w-[100%] md:h-[70vh] h-[30vh]"
                    />
                  </div>
                </div>
                <div className="md:h-full h-[40vh]  overflow-auto">
                  {data.para.map((p) => {
                    return <p className=" px-2 mb-1">{p}</p>;
                  })}
                </div>
                <button className="bg-red-400 mt-4 float-right text-xs text-white font-sans px-2 py-2 lg:text-xl">
                  Know More
                </button>
                <div>
                  {`Homeopathy` == data.title ? (
                    <button className="bg-orange-500 mt-4 text-white px-3 py-1 text-base rounded-md hover:border-blue-600 border-solid">
                      Diagnose Disease
                    </button>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Awareness;
