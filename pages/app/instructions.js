const Instructions = ({ setModal }) => {
  return (
    <div className="flex justify-start h-96 rounded-3xl items-start">
      <p className="text-3xl m-3 p-3 font-semibold text-teal-700">
        Choose your bodypart and further steps with correct details and get your
        diagnosed report.
      </p>
      <div className="mr-5 cursor-pointer">
        <i className="fa-solid fa-xmark" onClick={() => setModal(false)} />
      </div>
    </div>
  );
};

export default Instructions;
