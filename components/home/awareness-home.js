const AwarenessHome = () => {
  return (
    <div className="md:px-20   px-6 md:py-20 py-6">
      <h1 className="text-center">Awareness</h1>
      <div className="grid md:grid-cols-2 h-full w-full">
        <div className="flex justify-center items-center h-full w-full">
          <img
            className="md:h-[70vh] h-[50vh] w-full"
            src="Images-new/Home/meditation-01-01.svg"
          />
        </div>
        <div className="text-3xl font-serif flex justify-center items-center flex-col">
          <p className="font-semibold mt-4">Health Help</p>
          <ul className="text-lg px-0">
            <li>Nutrition</li>
            <li>Lifestyle</li>
            <li>Yoga & Exercise</li>
            <li>Meditation</li>
            <li>Home Remedies</li>
            <li>Naturopathy</li>
            <li>Acupressure</li>
            <li>Acupuncture</li>
            <li>Ayurveda</li>
            <li>Homeopathy</li>
          </ul>
          <div>
            <button className="bg-red-400 text-xs text-white  lg:px-5 lg:py-2 lg:text-xl">
              Know More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AwarenessHome;
