import React from 'react';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import InfoIcon from '@mui/icons-material/Info';
import { Box } from '@mui/material';
import { fontSize, margin, padding } from '@mui/system';
import { Margin } from '@mui/icons-material';

const Footer = () => {

  // const [show, setShow] = useState(false);

  return (
    <footer className=" lg:text-left bg-dropdown-bg text-white">
        <>
      <div className="flex justify-center items-center lg:justify-between p-6 border-b border-gray-300">
        <div className="mr-12 hidden lg:block">
          <span>Get connected with us on social networks:</span>
        </div>
        <div className="flex justify-center text-white">
          <a href="#!" className="mr-6">
            <i className="fa-brands fa-facebook-f"></i>
          </a>
          <a href="#!" className="mr-6">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="#!" className="mr-6">
            <i className="fa-brands fa-linkedin-in"></i>
          </a>
          <a href="#!">
            <i className="fa-brands fa-twitter"></i>
          </a>
        </div>
      </div>
      <div className="mx-6 py-10 text-center md:text-left">
        <div className="grid grid-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="">
            <h6
              className="
    uppercase
    font-semibold
    mb-4
    flex
    items-center
    justify-center
    md:justify-start
  "
            >
              Sadhana
            </h6>
            <div>
              <h6 className="mb-4">
                <a href="/contact-us">
                  <AddIcCallIcon sx={{ m: 1 }} />
                  Contact Us
                </a>
              </h6>
            </div>
            <div>
              <h6 className="mb-4">
                <a href="/about-us">
                  <InfoIcon sx={{ m: 1 }} />
                  About Us
                </a>
              </h6>
            </div>
          </div>
          <div className="text-white">
            <h6 className="uppercase font-semibold mb-4 flex justify-center">
              Products
            </h6>
            <div className="text-gray-400">
              <p className="mb-4">
                <a href="#!">Angular</a>
              </p>
              <p className="mb-4">
                <a href="#!">React</a>
              </p>
              <p className="mb-4">
                <a href="#!">Vue</a>
              </p>
              <p>
                <a href="#!">Laravel</a>
              </p>
            </div>
          </div>
          <div className="">
            <h6 className="uppercase font-semibold mb-4 flex justify-center">
              Info
            </h6>
            <div className="text-gray-400">
              <p className="mb-4">
                <a href="#!">Pricing</a>
              </p>
              <p className="mb-4">
                <a href="#!">Settings</a>
              </p>
              <p className="mb-4">
                <a href="#!">Orders</a>
              </p>
              <p>
                <a href="#!">Help</a>
              </p>
            </div>
          </div>
          <div className="">
            <h6 className="uppercase font-semibold mb-4 flex justify-center md:justify-start">
              Contact
            </h6>
            <div className="text-gray-400">
              <p className="flex items-center justify-center md:justify-start mb-4">
                <i className="fa-solid fa-house-chimney "></i>
                <span className="ml-4">New York, NY 10012, US</span>
              </p>
              <p className="flex items-center justify-center md:justify-start mb-4">
                <i className="fa-solid fa-envelope"></i>
                <span className="ml-4"> info@example.com </span>
              </p>
              <p className="flex items-center justify-center md:justify-start mb-4">
                <i className="fa-solid fa-phone-flip"></i>
                <span className="ml-4"> + 01 234 567 88 </span>
              </p>
              <p className="flex items-center justify-center md:justify-start">
                <i className="fa-solid fa-print"></i>
                <span className="ml-4"> + 01 234 567 89 </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      </>
    </footer>
  );
};

export default Footer;
