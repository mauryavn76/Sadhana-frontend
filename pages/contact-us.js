import { Fragment, useState, useEffect } from 'react';
import NewsLetter from '../components/multiusable/news-letter';
import { AnimatePresence } from 'framer-motion';
import SocialContact from '../components/contact-us/middle-section';
import Input from './input-field';
import ContactModal from '../components/layout/contact-modal';
import { Snackbar } from '@mui/material';
import Image from 'next/image';

const ContactUs = () => {
  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
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

  const { vertical, horizontal, open } = state;
  const [snackMessage, setSnackMessage] = useState('');

  console.log(snackMessage);

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <Fragment>
      <div className={`flex items-center bg-white h-[calc(100vh-80px)] px-10`}>
        <div className="flex-1 flex justify-center">
        <div className="bg-gray-300 flex justify-center h-full w-full">
        <div className="bg-white px-10 py-10 h-full w-full shadow-lg border-0 my-12">
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
        <Image
          src="/images/home-images/contact-us-new.png"
          height="450%"
          width="700%"
        />
      </div>

      <AnimatePresence initial={false} exitBeforeEnter={true}></AnimatePresence>

      <SocialContact />
      {/* <NewsLetter /> */}

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={snackMessage}
        key={vertical + horizontal}
      />
    </Fragment>
  );
};

export default ContactUs;

// import { Fragment, useEffect, useState } from 'react';
// import NewsLetter from '../components/multiusable/news-letter';
// import { AnimatePresence } from 'framer-motion';
// import SocialContact from '../components/contact-us/middle-section';
// import ContactModal from '../components/layout/contact-modal';
// import BASE_URL from '../utils/base-url';

// const ContactUs = () => {
//   const [modal, setModal] = useState(false);
//   const [contactName, setContactName] = useState('');
//   const [contactEmail, setContactEmail] = useState('');
//   const [contactPhone, setContactPhone] = useState('');
//   const [contactMessage, setContactMessage] = useState('');

//   const [feedbackErrors, setFeedbackErrors] = useState({});
//   const [isSubmit, setIsSubmit] = useState(false);
//   // const [isValid, setIsValid] = useState(false);

//   const openModal = () => {
//     setModal(true);
//     // document.body.style.overflow = 'hidden';
//   };

//   const validate = () => {
//     let errors = {};
//     const validateEmail = email => {
//       return String(email)
//         .toLowerCase()
//         .match(
//           /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//         );
//     };

//     if (!validateEmail(contactEmail)) {
//       errors.emailError = 'Please enter valid email';
//     }
//     if (!contactPhone.match('^([0|+[0-9]{1,5})?([7-9][0-9]{9})$')) {
//       errors.phoneError = 'Please enter valid phone';
//     }
//     if (contactMessage.length === 0) {
//       errors.messageError = 'Please enter Message';
//     }
//     if (contactName.length === 0) {
//       errors.nameError = 'Please enter your Name';
//     }
//     return errors;
//   };

//   const feedbackHandler = async e => {
//     e.preventDefault();
//     setFeedbackErrors(validate());

//     // setIsValid(true);
//     setIsSubmit(!isSubmit);
//   };

//   console.log(feedbackErrors);

//   useEffect(() => {
//     if (Object.keys(feedbackErrors).length === 0) {
//       const submitFeedback = async () => {
//         const feedback = {
//           email: contactEmail,
//           phone: contactPhone,
//           title: contactName,
//           description: contactMessage,
//         };
//         const res = await BASE_URL.post('/feedback', feedback);
//         console.log(res);
//       };
//       submitFeedback();
//     }
//   }, [feedbackErrors, isSubmit]);

//   return (
//     <Fragment>
//       {/* <div className="flex lg:justify-end lg:items-end justify-center items-center">
//         <img
//           className="lg:w-1/5 lg:h-1/2 w-2/4 h-2/6"
//           src="/images/home-images/contact-us.png"
//         />
//       </div> */}
//       <div className={`flex lg:mx-28 mx-0 justify-start h-[calc(100vh)]`}>
//         <div className=" flex justify-center h-min lg:h-max w-1/2 lg:w-6/12 m-10 p-10 shadow-md shadow-gray-400 rounded-3xl">
//           <form>
//             <h6 className="flex justify-center items-center text-base bottom-5 font-sans font-bold drop-shadow-lg lg:text-3xl text-gray-500">
//               We are here to Help
//             </h6>
//             <div className="flex flex-col">
//               <label className="flex justify-center">
//                 <input
//                   className="lg:w-96 lg:h-10 sm:w-52 sm:h-7 w-40 text-xs h-4 m-2 p-2 lg:text-base rounded-3xl border-2 border-blue-300"
//                   type="text"
//                   placeholder="Name"
//                   value={contactName}
//                   onChange={e => setContactName(e.target.value)}
//                   // id="name"
//                 />
//               </label>
//               <p className="text-red-600">{feedbackErrors.nameError}</p>
//               <label className="flex justify-center">
//                 <input
//                   className="lg:w-96 lg:h-10 sm:w-52 sm:h-7 w-40 text-xs h-4 m-2 p-2 lg:text-base rounded-3xl border-2 border-blue-300"
//                   type="text"
//                   placeholder="Email"
//                   value={contactEmail}
//                   onChange={e => setContactEmail(e.target.value)}
//                   // id="email"
//                 />
//               </label>
//               <p className="text-red-600">{feedbackErrors.emailError}</p>
//               <label className="flex justify-center">
//                 <input
//                   className="lg:w-96 lg:h-10 sm:w-52 sm:h-7 flex justify-center lg:text-base text-xs w-40 h-4 m-2 p-2 rounded-3xl border-2 border-blue-300"
//                   type="number"
//                   value={contactPhone}
//                   onChange={e => setContactPhone(e.target.value)}
//                   placeholder="Mobile"
//                   // id="mobile"
//                 />
//               </label>
//               <p className="text-red-600">{feedbackErrors.phoneError}</p>
//               <label className="flex justify-center">
//                 <textarea
//                   value={contactMessage}
//                   onChange={e => setContactMessage(e.target.value)}
//                   className="lg:w-96 w-40 sm:w-52 flex justify-center lg:text-base text-xs m-2 p-2 rounded-3xl border-2 border-blue-300"
//                   placeholder="Message"
//                   // id="message"
//                 />
//               </label>
//               <p className="text-red-600">{feedbackErrors.messageError}</p>
//               <div className="flex items-center justify-center">
//                 <button
//                   onClick={e => feedbackHandler(e)}
//                   className="rounded-3xl lg:font-normal font-thin lg:text-xl text-xs w-40 h-6 lg:w-96 lg:h-10 bg-gray-400 hover:bg-slate-500 text-white"
//                 >
//                   SEND
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//         {/* <div className=" h-1/4 w-1/4">
//           <img src="/images/contact-us-images/contact-us-banner.jpg" />
//         </div> */}
//         <div className="flex flex-1 mb-60 justify-end items-end">
//           <img src="/images/home-images/contact-us.png" />
//         </div>
//       </div>

//       <br />
//       <br />
//       <div className="flex flex-col items-center xl:flex-row md:flex-row md:ml-40 lg:flex-row">
//         <div className="lg:h-1/5 lg:w-2/5 md:h-1/4 md:w-2/3 h-1/3 w-2/5">
//           <img src="/images/home-images/connect.png" />
//         </div>
//         <div className="text-xl drop-shadow-xl md:text-lg">
//           <h5 className=" flex flex-col items-center xl:items-baseline lg:items-baseline px-7 m-3 font-sans font-bold text-gray-500 drop-shadow-lg text-3xl">
//             Connect
//           </h5>
//           <div className="font-sans flex items-center xl:items-baseline lg:items-baseline text-gray-600 p-7 flex-col">
//             <h5 className="p-3">+9100000000</h5>
//             <h5 className="p-3">Social Links</h5>
//             <h5 className="p-3">
//               Off No 45 and 46, Manoshi Complex, Ghansoli, Opp Railway Station
//             </h5>
//           </div>
//         </div>
//       </div>

//       <SocialContact />
//       <NewsLetter />
//     </Fragment>
//   );
// };

// export default ContactUs;


// // import ContactModal from '../components/layout/contact-modal';

// const ContactUs = () => {
//   // const [modal, setModal] = useState(false);

//   // const openModal = () => {
//   //   setModal(true);
//   //   // document.body.style.overflow = 'hidden';
//   // };

//   return (
//     <Fragment>
//       <div className={`flex items-center bg-white h-[calc(100vh-80px)]`}>
//         <div className="bg-gray-700 relative flex justify-center h-[90vh] 2xl:h-[80vh] w-[40vw] ">
//           <div className="bg-white absolute top-[25%] px-10 py-10 h-[60vh] 2xl:h-[50vh] w-[45vw] shadow-lg border-0 ">
//             <form>
//               <div className="flex  w-full">
//                 <div className="flex-1">
//                   <div className="mb-10">
//                     <h1 className="text-gray-400 font-bold text-4xl">
//                       CONTACT US
//                     </h1>
//                   </div>
//                   <div>
//                     <label
//                       htmlFor="name"
//                       className="font-semibold text-gray-400"
//                     >
//                       NAME
//                     </label>
//                     <Input />
//                     <label
//                       htmlFor="email"
//                       className="font-semibold text-gray-400"
//                     >
//                       E-MAIL
//                     </label>
//                     <Input />
//                   </div>
//                 </div>
//                 <div className="h-full -mr-[20%]">
//                   <img
//                     className="flex-1 h-48"
//                     src="/images/contact-us-images/location.png"
//                     alt=""
//                   />
//                 </div>
//               </div>
//               <label htmlFor="message" className="font-semibold text-gray-400">
//                 MESSAGE
//               </label>
//               <Input />
//             </form>
//           </div>
//         </div>
{
  /* <div className="z-10 flex-1 flex justify-center">
          {modal ? (
            <ContactModal setModal={setModal} />
          ) : (
            <div
              className="  text-white w-72 h-10 flex items-center justify-center  bg-gradient-to-r from-cyan-500 to-blue-400  border-b-0 
              shadow-xl shadow-gray-600"
            >
              <button onClick={openModal}>Contact US</button>
            </div>
          )}
        </div> */
}