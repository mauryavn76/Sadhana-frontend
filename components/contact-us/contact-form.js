// import Input from './input-field';

// const ContactForm = ({ setModal }) => {
//   return (
//     <div className="bg-gray-700 relative flex justify-center h-[90vh] 2xl:h-[80vh] w-[40vw] ">
//       <div className="bg-white absolute top-[25%] px-10 py-10 h-[60vh] 2xl:h-[50vh] w-[45vw] shadow-lg border-0 ">
//         <i className="fa-solid fa-xmark" onClick={() => setModal(false)} />
//         <form>
//           <div className="flex  w-full">
//             <div className="flex-1">
//               <div className="mb-10">
//                 <h1 className="text-gray-400 font-bold text-4xl">CONTACT US</h1>
//               </div>
//               <div>
//                 <label htmlFor="name" className="font-semibold text-gray-400">
//                   NAME
//                 </label>
//                 <Input />
//                 <label htmlFor="email" className="font-semibold text-gray-400">
//                   E-MAIL
//                 </label>
//                 <Input />
//               </div>
//             </div>
//             <div className="h-full -mr-[20%]">
//               <img
//                 className="flex-1 h-48"
//                 src="/images/contact-us-images/location.png"
//                 alt=""
//               />
//             </div>
//           </div>
//           <label htmlFor="message" className="font-semibold text-gray-400">
//             MESSAGE
//           </label>
//           <Input />
//         </form>
//       </div>
//     </div>
//   );
// };
// export default ContactForm;
import { useEffect } from 'react';
import { useState } from 'react';
import Input from './input-field';
import BASE_URL from '../../utils/base-url';
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';
import Grow from '@mui/material/Grow';

const ContactForm = ({ click, setSnack }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [feedbackErrors, setFeedbackErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const validate = () => {
    let errors = {};
    if (email.length === 0) {
      errors.emailError = 'Please enter your Email';
    }
    if (phone.length === 0) {
      errors.phoneError = 'Please enter your Phone';
    }
    if (message.length === 0) {
      errors.messageError = 'Please enter your Message';
    }
    return errors;
  };

  const handleFeedbackSubmit = () => {
    setFeedbackErrors(validate());
    setIsSubmit(true);
  };

  const submitFeedback = async () => {
    let feedback = {
      title: email,
      email: email,
      phone: phone,
      description: message,
    };
    if (Object.keys(feedbackErrors).length === 0) {
      try {
        const res = await BASE_URL.post('/feedback', feedback);
        setSnack('Feedback Submitted');
        click();
        setEmail('');
        setPhone('');
        setMessage('');
        console.log(res);
      } catch (err) {
        setSnack(err?.response?.data?.message);
        console.log(err);
        click();
      }
    }
  };

  useEffect(() => {
    if (isSubmit) {
      submitFeedback();
    }
  }, [isSubmit, feedbackErrors]);

  return (
    <>
    <div>
      <div className="bg-gray-200 relative flex justify-center h-full w-[40vw]">
        <div className="bg-white absolute top-[25%] px-10 py-10 h-[65vh] w-[45vw] shadow-lg border-0 ">
          <form>
            <div className="flex w-full">
              <div className="flex-1">
                <div className="mb-6">
                  <h1 className="text-gray-400 font-bold text-4xl">
                    CONTACT US
                  </h1>
                </div>
                <div>
                  <label htmlFor="name" className="font-semibold text-gray-400">
                    EMAIL
                  </label>
                  <Input value={email} onChange={setEmail} />
                  <p className="text-[#E50000] text-sm m-0">
                    {feedbackErrors.emailError
                      ? feedbackErrors.emailError
                      : '  '}
                  </p>
                  <label
                    htmlFor="email"
                    className="font-semibold text-gray-400 mt-1"
                  >
                    PHONE
                  </label>
                  <Input value={phone} onChange={setPhone} />
                  <p className="text-[#E50000] text-sm m-0">
                    {feedbackErrors.phoneError
                      ? feedbackErrors.phoneError
                      : '  '}
                  </p>
                </div>
              </div>
              {/* <div className="h-full -mr-[20%]">
                <img
                  className="flex-1 h-48"
                  src="/images/contact-us-images/location.png"
                  alt=""
                />
              </div> */}
            </div>
            <label
              htmlFor="message"
              className="mt-1 font-semibold text-gray-400"
            >
              MESSAGE
            </label>
            <Input value={message} onChange={setMessage} />
            <p className="text-[#E50000] text-sm m-0">
              {feedbackErrors.messageError ? feedbackErrors.messageError : ' '}
            </p>
          </form>
          <button
            className="bg-gray-700 rounded-sm py-2 px-4 text-white mt-4"
            onClick={handleFeedbackSubmit}
          >
            Submit
          </button>
        </div>
      </div>
      </div>
    </>
  );
};
export default ContactForm;

// import React, { useState } from "react";
// import axios from "axios";
// const ContactForm = ({ setModal }) => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const submitFeeback = async (e) => {
//     e.preventDefault();
//     const user = {
//       name,
//       email,
//       message,
//     };
//     const res = await axios.post(
//       "https://sadhna-backend.herokuapp.com/feedback/",
//       user
//     );
//     console.log(res);
//   };

//   return (
//     <div className="bg-gray-700 relative flex justify-center h-[90vh] 2xl:h-[80vh] w-[40vw]">
//       <div className="bg-white absolute top-[25%] px-10 py-10 h-[60vh] 2xl:h-[50vh] w-[45vw]">
//         <i className="fa-solid fa-xmark" onClick={() => setModal(false)} />
//         <form>
//           <div className="flex  w-full">
//             <div className="flex-1">
//               <div className="mb-10">
//                 <h1 className="text-gray-400 font-bold text-4xl">CONTACT US</h1>
//               </div>
//               <div>
//                 <label
//                   htmlFor="name"
//                   className="font-semibold text-gray-400"
//                   onChange={(e) => setName(e.target.value)}
//                 >
//                   NAME
//                 </label>
//                 <Input onChange={(e) => setName(e.target.value)} />
//                 <label
//                   htmlFor="email"
//                   className="font-semibold text-gray-400"
//                   onChange={(e) => setEmail(e.target.value)}
//                 >
//                   E-MAIL
//                 </label>
//                 <Input onChange={(e) => setEmail(e.target.value)} />
//               </div>
//             </div>
//             <div className="h-full -mr-[20%]">
//               <img
//                 className="flex-1 h-48"
//                 src="/images/contact-us-images/location.png"
//                 alt=""
//               />
//             </div>
//           </div>
//           <label
//             htmlFor="message"
//             className="font-semibold text-gray-400"
//             onChange={(e) => setMessage(e.target.value)}
//           >
//             MESSAGE
//           </label>
//           <Input onChange={(e) => setMessage(e.target.value)} />
//           <button onClick={submitFeeback}>Click</button>
//         </form>
//       </div>
//     </div>
//   );
// };
// export default ContactForm;
