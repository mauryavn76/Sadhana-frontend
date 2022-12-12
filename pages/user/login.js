import axios from 'axios';
import Image from 'next/image';
import React, { useState, useRef, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import TextInput from '../../components/multiusable/text-input';
import nookies from 'nookies';
import { useCookies } from 'react-cookie';
import LoaderFunction from '../../components/multiusable/loader';
import BASE_URL from '../../utils/base-url';
import { AuthContext } from '../../utils/authContext';

const Login = () => {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [emailError, setemailError] = useState('');
  const [passwordError, setpasswordError] = useState('');
  const [muiSpinner, setShowMuiSpinner] = useState();
  const [loginError, setLoginError] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);

  const [cookie, setCookie] = useCookies(['access-token']);

  const authContext = useContext(AuthContext);

  const router = useRouter();

  const validate = () => {
    if (emailInput.length === 0) {
      setemailError('Please Enter your Email');
    } else {
      setemailError('');
    }
    if (passwordInput.length === 0) {
      setpasswordError('Please enter your Password');
    } else {
      setpasswordError('');
    }
    if (emailError.length > 0 || passwordError.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    // setEmailInput('');
    // setPasswordInput('');
    // setShowMuiSpinner(true);
    e.preventDefault();
    setLoginError(validate());
    setIsValid(true);
    setIsSubmit(!isSubmit);
    console.log('form submitted ✅');
  };

  useEffect(() => {
    if (isValid) {
      const login = async () => {
        if (emailError.length > 0 || passwordError.length > 0) {
          console.log('Error');
          return;
        } else {
          setShowMuiSpinner(true);
          const res = await BASE_URL.post('/user/login', {
            email: emailInput,
            password: passwordInput,
          })
            .then((res) => {
              console.log(res.data);
              // setEmailInput('');
              // setPasswordInput('');
              localStorage.setItem(
                'user',
                JSON.stringify(res.data.data[0].user)
              );
              localStorage.setItem('access-token', res.data.data[0].token);
              localStorage.setItem(
                'refresh-token',
                res.data.data[0].refresh_token
              );
              // authContext?.setAuthState(res.data.data[0].token);
              setCookie('access-token', res.data.data[0].token, { path: '/' });
              router.push('/admin');
            })
            .catch((err) => {
              setShowMuiSpinner(false);
              console.log(err);
              isValid && setLoginErrorMessage(err?.response?.data?.message);
              // setEmailInput('');
              // setPasswordInput('');
            });
        }
      };
      login();
    }
  }, [isSubmit, emailError, passwordError]);

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-[50%] rounded-xl h-72 shadow-lg flex justify-center items-center">
        <div className="w-[45%] h-full">
          <img
            className="h-full rounded-bl-xl rounded-tl-xl"
            src="/images/admin/Login.png"
            alt=""
          />
        </div>
        <div className="w-[55%] h-full flex flex-col items-center justify-start">
          <h1 className="text-2xl font-bold w-max mb-6 mt-2">
            Sadhana Admin Login
          </h1>
          <p className="text-[#E50000] text-sm m-0">{loginErrorMessage}</p>
          <div className="flex h-full w-[80%] flex-col items-end">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="w-full mb-3">
                <p className="m-0 text-md">Email</p>
                <TextInput
                  value={emailInput}
                  onChange={setEmailInput}
                  error={emailError}
                />
                <p className="text-[#E50000] text-sm m-0">
                  {emailError ? emailError : ' '}
                </p>
              </div>
              <div className="w-full mb-3">
                <p className="m-0 text-md">Password</p>
                <TextInput
                  type="password"
                  error={passwordError}
                  value={passwordInput}
                  onChange={setPasswordInput}
                />
                <p className="text-[#E50000] text-sm m-0">
                  {passwordError ? passwordError : ' '}
                </p>
              </div>
              {/* <div className="w-full flex justify-end"> */}
              <button
                type='submit'

                className="bg-[#8FECFF] h-8 w-24 font-semibold"
              >
                Login
              </button>
            </form>
            {muiSpinner && (
              <div className="fixed flex justify-center items-center left-0 bg-black opacity-70 top-0 w-full h-full">
                <LoaderFunction height="100" width="100" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

// const validate = () => {
//   // setShowMuiSpinner(false);
//   if (
//     !emailInput.match(
//       /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//     )
//   ) {
//     setemailError('Please enter email');
//   } else {
//     setemailError();
//   }
//   if (passwordInput.length === 0) {
//     setpasswordError('Please enter Password');
//   } else {
//     setpasswordError();
//   }
//   // email = "";
//   // password = "";

//   if (emailError.length > 0 || passwordError.length > 0) {
//     return true;
//   }
// };

// const handleSubmit = async () => {
//   const isError = validate().then(async() => {
//   console.log(isError);
// setShowMuiSpinner(false);
// if (
//   !emailInput.match(
//     /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//   )
// ) {
//   setemailError('Please enter email');
// } else {
//   setemailError();
// }
// if (passwordInput.length === 0) {
//   setpasswordError('Please enter Password');
// } else {
//   setpasswordError();
// }
// // email = "";
// // password = "";

// if (emailError.length > 0 || passwordError.length > 0) {
//   return;
// } else {
// if (isError) {
//   return;
// } else {
// const res = await BASE_URL.post('/user/login', {
//   email: emailInput,
//   password: passwordInput,
// });
//   console.log('Login Response', res);
//   setShowMuiSpinner(true);
//   if (res.status == 200) {
//     console.log('Login Response', res);
// localStorage.setItem('user', JSON.stringify(res.data.data[0].user));
// localStorage.setItem('access-token', res.data.data[0].token);
// setCookie('access-token', res.data.data[0].token, { path: '/' });
// router.push('/admin');
//   } else {
//     // alert(res.response.data.message);
//     alert('Hello');
//   });

// nookies.set(
//   res.data.data[0].token,
//   'access-token',
//   res.data.data[0].token,
//   {
//     maxAge: 30 * 24 * 60 * 60,
//     path: '/',
//   }
// );

// } else {
//   alert(res.data);
//   }
// };
