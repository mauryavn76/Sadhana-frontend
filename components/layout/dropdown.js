const Dropdown = ({ list }) => {
  return (
    <ul className="z-10 justify-center items-center w-full h-40 bg-dropdown-bg text-white hidden group-hover:flex absolute top-full left-0">
      {list.map((title) => {
        return (
          <li
            key={title}
            className=" h-full w-44 hover:bg-dropdown-item-hover-color flex flex-col items-center justify-center"
          >
            <i className="fa-solid fa-file text-5xl mb-2 text-dropdown-item-color"></i>
            <span>{title}</span>
          </li>
        );
      })}
    </ul>
  );
};
export default Dropdown;

// const Dropdown = ({ list }) => {
//   return (
//     <ul className="z-10 justify-center items-center w-full h-40 bg-dropdown-bg text-white hidden group-hover:flex absolute top-full left-0">
//       {list.map((title) => {
//         return (
//           <li
//             key={title}
//             className=" h-full w-44 hover:bg-dropdown-item-hover-color flex flex-col items-center justify-center"
//           >
//             <i className="fa-solid fa-file text-5xl mb-2 text-dropdown-item-color"></i>
//             <span>{title}</span>
//           </li>
//         );
//       })}
//     </ul>
//   );
// };
// export default Dropdown;
