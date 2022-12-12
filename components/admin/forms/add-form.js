// import React from 'react'

// const Addform = ({setShowModal}) => {
//   return (
//     <div className='absolute items-center left-[33%] top-20 border-2 p-8 bg-white'>
//  <div className=" flex-row  justify-center items-center h-full space-y-5">
//  <span className="absolute right-5 top-2">
//             <i onClick={() => setShowModal(false)} class="fa-solid fa-xmark"></i>
//           </span>
//         <h1 className="text-3xl text-center">New User</h1>

//         <div className="">
//           <div>
//             <p>First Name</p>
//             <input
//               className="border-2 w-96 mb-5 border-black"
//               type="text"y
//               name="FirstName"
//             //   value={user ? user.first_name : ""}
//               onChange={(e) => setFirstName(e.target.value)}
//             />
//           </div>

//           <div>
//             <p className="">Last Name</p>
//             <input
//               className="border-2 w-96 mb-5 border-black"
//               type="text"
//               name="LastName"
//             //   value={user ? user.last_name : ""}
//               onChange={(e) => setLastName(e.target.value)}
//             />
//           </div>
//           <p>Email</p>
//           <input
//             className="border-2 w-96  mb-5 border-black"
//             type="text"
//             name="Email"
//             // value={user ? user.email : ""}
//             // onChange={(e) => setEmail(e.target.value)}
//           />
//           <p>Mobile Number</p>
//           <input
//             className="border-2 border-black w-96 mb-5"
//             type="text"
//             name="MobileNumber"
//             // value={user ? user.mobile_number : ""}
//             // onChange={(e) => setMobile(e.target.value)}
//           />
//           <p>Password</p>
//           <input
//             className="border-2 w-96 mb-5 border-black"
//             type="text"
//             name="Password"
//             // value={user ? user.password : ""}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <div className="flex space-x-2 items-center ">
//             <input className="bg-[#63FFFD]" type="checkbox" />
//             <p>Is Admin ?</p>
//           </div>

//           <div className="flex justify-end">
//             <button
//             //   onClick={user ? handlePut : handlePost}
//               className="border-2 bg-[#8FECFF] px-9 "
//             >
//               Add User
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Addform