import Layout from '../components/layout/layout';
import '../styles/globals.css';
import { useRouter } from 'next/router';
import Sidebar from '../components/admin/admin-sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CookiesProvider } from 'react-cookie';
import { useEffect, useState, useContext } from 'react';
import { AuthContext, AuthProvider } from '../utils/authContext';
import NextNProgress from 'nextjs-progressbar';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import BASE_URL from '../utils/base-url';
import AdminLayout from '../components/multiusable/admin-layout';
// import Login from './user/login';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [token, setToken] = useState('');

  // console.log(router.pathname.split('/'));
  const getToken = () => {
    if (typeof window !== 'undefined') {
      let token = localStorage.getItem('access-token');
      return token;
    }
  };

  const getRefreshToken = () => {
    if (typeof window !== 'undefined') {
      let token = localStorage.getItem('refresh-token');
      return token;
    }
  };

  console.log('accessToken', getToken());
  const refreshToken = async () => {
    const res = await axios.post(
      'https://api.maaambeyeducation.in/api/user/refresh-token',
      {},
      {
        headers: {
          authorization: 'Bearer ' + getRefreshToken(),
        },
      }
    );
    console.log(res.data);
    localStorage.setItem('access-token', res.data.data.access_token);
  };

  console.log('date', Date.now() / 1000);
  useEffect(() => {
    console.log('date', Date.now() / 1000);
    if (getToken()) {
      if (
        jwtDecode(getToken()?.toString()).exp < Date.now() / 1000 &&
        router.pathname.includes('admin')
      ) {
        refreshToken();
      }
    }
  }, [getToken()]);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     console.log("_app_GetToken", getToken());
  //     // setToken(localStorage.getItem("access-token"));
  //     if (router.pathname.includes("admin") && !getToken()) {
  //       router.push("/user/login");
  //     }
  //     if (router.pathname == "/user/login" && getToken()) {
  //       router.push("/admin");
  //     }
  //   }
  // }, []);

  console.log('refreshtoken', getRefreshToken());
  let showLayout = true;
  if (router.pathname.includes('admin') || router.pathname.includes('user')) {
    showLayout = false;
  }
  const login = router.pathname == '/user/login' ? true : false;
  const dashboard = router.pathname.includes('admin') ? true : false;

  return (
    <AuthProvider>
      {showLayout && (
        <CookiesProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CookiesProvider>
      )}
      {login && (
        <CookiesProvider>
          <Component {...pageProps} />
        </CookiesProvider>
      )}

      {dashboard && (
        <CookiesProvider>
          <NextNProgress />
          {/* <AdminLayout> */}
          <div className="flex">
            <Sidebar />
            <Component {...pageProps} />
          </div>
          {/* </AdminLayout> */}
        </CookiesProvider>
      )}
    </AuthProvider>
  );
}

export default MyApp;
