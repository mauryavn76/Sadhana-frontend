// import { useRef, useState } from 'react';
// import Input from './input-field';
// // sm:pb-17 md:pt-20 md:pb-24
// const ContactForm = ({ setModal }) => {
//   //Inputs
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [feedback, setFeedback] = useState('');

//   //Errors
//   const [nameError, setNameError] = useState(false);
//   const [emailError, setEmailError] = useState(false);
//   const [phoneError, setPhoneError] = useState(false);
//   const [feedbackError, setFeedbackError] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!name) {
//       setNameError(true);
//     } else {
//       setNameError(false);
//     }
//     if (
//       !email ||
//       email.match(
//         '/^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/'
//       )
//     ) {
//       setEmailError(true);
//     } else {
//       setEmailError(false);
//     }
//     if (
//       !phone ||
//       phone.match('/^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/im')
//     ) {
//       setPhoneError(true);
//     } else {
//       setPhoneError(false);
//     }
//     if (!feedback) {
//       setFeedbackError(true);
//     } else {
//       setFeedbackError(false);
//     }
//   };

//   const closeModal = () => {
//     document.body.style.overflow = 'auto';
//     setModal(false);
//   };

//   return (
//     <div className="relative shadow-xl text-black w-2/5 rounded-lg py-4 bg-white flex flex-col items-center sm:pt-15 ">
//       <div className="w-4/5 flex flex-col items-start space-y-4">
//         <h1 className="text-lg  font-bold sm:text-xl md:text-2xl">
//           Submit your Feedback
//         </h1>
//         <form
//           onSubmit={(e) => handleSubmit(e)}
//           className="w-full flex flex-col items-center"
//         >
//           <Input
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             type="text"
//             name="name"
//             placeHolder="Name"
//           />
//           <div className="w-full">
//             <p
//               className={`${
//                 nameError ? 'visible' : 'invisible'
//               } text-red-500 text-left`}
//             >
//               Please enter Name
//             </p>
//           </div>
//           <Input
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             type="text"
//             name="email"
//             placeHolder="Email Address"
//           />
//           <div className="w-full">
//             <p
//               className={`${
//                 emailError ? 'visible' : 'invisible'
//               } text-red-500 text-left`}
//             >
//               Please enter Email
//             </p>
//           </div>
//           <Input
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             type="tel"
//             max={10}
//             name="number"
//             placeHolder="Phone Number"
//           />
//           <div className="w-full">
//             <p
//               className={`${
//                 phoneError ? 'visible' : 'invisible'
//               } text-red-500 text-left`}
//             >
//               Please enter Phone
//             </p>
//           </div>
//           <textarea
//             className="w-full h-20 px-3 border-[1px]  border-gray-400 text-black"
//             onChange={(e) => setFeedback(e.target.value)}
//             placeholder="Feedback"
//             name="feedback"
//           ></textarea>
//           <div className="w-full">
//             <p
//               className={`${
//                 feedbackError ? 'visible' : 'invisible'
//               } text-red-500 text-left`}
//             >
//               Please enter Feedback
//             </p>
//           </div>
//           <button className="bg-orange-500 text-white mt-2 py-2 px-5 text-xs sm:py-4 sm:px-8">
//             JOIN NOW
//           </button>
//         </form>
//       </div>
//       <div className="absolute top-2 right-5">
//         <i onClick={closeModal} className="text-xl fa-solid fa-xmark" />
//       </div>
//     </div>
//   );
// };

// export default ContactForm;
