const AboutUs = () => {
  return (
    <div className="grid md:grid-cols-2 h-full w-full md:px-16 px-6 md:py-16 py-6">
      <div className="mx-4">
        <img
          className=" h-full  w-full "
          src="Images-new/Home/home-section.svg"
        />
      </div>
      <div className="bg-[#36bcaf] h-full font-medium text-md p-4 rounded-xl">
        <p>
          Ancient science which could not be preserved, has a lot of such
          information, which science has now started admitting. Science now
          admits that body cells regenerate and replace old cells on their own
          and it is an inbuilt auto process.
        </p>
        <br />
        <p>
          People have forgotten and have not explored its inbuilt capabilities
          of self-healing, which with his other creations makes it fully
          selfdependent
        </p>
        <br />
        <p>
          All of us should value and respect and make best use of the same for
          humankind. Effort has been made to understand and explore those
          capabilities of self-healing by natural means
        </p>
        <br />
        <p>
          We are here to assist you in exploring your recreational forces within
          you.
        </p>
        <div>
          <button id="btn-grad">Know More</button>
        </div>
      </div>
      {/* className="float-right text-xs rounded-md lg:px-5 lg:py-2 lg:text-xl" */}
    </div>
  );
};

export default AboutUs;

{
  /* <div className="flex flex-col lg:flex-row py-8 lg:py-0 lg:h-[100vh]">
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="flex flex-col h-full w-2/3 items-start lg:items-start text-5xl text-red-400 justify-evenly">
          <h1 className="border-l-4 border-red-400 pl-6 mb-5 lg:mb-0 text-lg lg:text-4xl">
            About Us
          </h1>
          <button className="bg-red-400 text-xs text-white font-sans px-3 py-2 rounded-md lg:px-5 lg:py-2 lg:text-2xl">
            Know More
          </button>
        </div>
      </div>
      <div className="font-semibold flex-1 flex flex-col justify-center items-center mt-5 lg:mt-5">
        <div className="w-2/3 py-2 text-xs lg:text-sm lg:py-4">
          <p>
            Ancient science which could not be preserved, has a lot of such
            information, which science has now started admitting. Science now
            admits that body cells regenerate and replace old cells on their own
            and it is an inbuilt auto process.
          </p>
          <br />
          <p>
            People have forgotten and have not explored its inbuilt capabilities
            of self-healing, which with his other creations makes it fully
            self-dependent.
          </p>
          <br />
          <p>
            All of us should value and respect and make best use of the same for
            humankind. Effort has been made to understand and explore those
            capabilities of self-healing by natural means.
          </p>
          <br />
          <p>
            We are here to assist you in exploring your recreational forces
            within you.
          </p>
        </div>
      </div>
    </div> */
}
