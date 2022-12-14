import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SidebarItems from "./sidebar-items";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import RssFeedOutlinedIcon from "@mui/icons-material/RssFeedOutlined";
import SickOutlinedIcon from "@mui/icons-material/SickOutlined";
import AirlineSeatLegroomExtraOutlinedIcon from "@mui/icons-material/AirlineSeatLegroomExtraOutlined";
import MasksOutlinedIcon from "@mui/icons-material/MasksOutlined";
import AppShortcutOutlinedIcon from "@mui/icons-material/AppShortcutOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import AlignHorizontalLeftOutlinedIcon from "@mui/icons-material/AlignHorizontalLeftOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import CoronavirusOutlinedIcon from "@mui/icons-material/CoronavirusOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LoaderFunction from "../multiusable/loader";
import TransparantButton from "../multiusable/transparent-button";
import { useAutoAnimate } from "@formkit/auto-animate/react";

// import {logOut} from 'next-auth/react'
// import nextAuth from 'next-auth';
// import NextAuth from './[next-auth]';
// import {useHistory} from 'react-router-dom'

const Sidebar = () => {
  const router = useRouter();
  const [dropdown, setDropdown] = useState(false);
  const [user, setUser] = useState();
  const [muiSpinner, setShowMuiSpinner] = useState("");
  const showMenu = () => setDropdown(!dropdown);
  const [animationParent] = useAutoAnimate();

  const logOut = () => {
    localStorage.clear();
    router.push("/user/login");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  // console.log(user);

  const dashBoardItems = [
    {
      title: "Home",
      icon: <HomeOutlinedIcon />,
      link: "/admin",
    },
    {
      title: "User",
      icon: <PersonOutlineOutlinedIcon />,
      dropdown: [
        {
          icon: <PersonAddAltOutlinedIcon />,
          title: "Add User",
          link: "/admin/users/create-user",
        },
        {
          icon: <AccountCircleOutlinedIcon />,
          title: "All Users",
          link: "/admin/users/get-users",
        },
      ],
    },
    {
      title: "Blogs",
      icon: <RssFeedOutlinedIcon />,
      dropdown: [
        {
          icon: <AddCircleOutlineOutlinedIcon />,
          title: "Add new blog",
          link: "/admin/blogs/create-blog",
        },
        {
          icon: <AlignHorizontalLeftOutlinedIcon />,
          title: "All blog",
          link: "/admin/blogs/get-blogs",
        },
      ],
    },
    {
      title: "Symptoms",
      icon: <SickOutlinedIcon />,
      link: "/admin/symptoms",
    },
    {
      title: "Body Part",
      icon: <AirlineSeatLegroomExtraOutlinedIcon />,
      link: "/admin/body_part",
    },
    {
      title: "Disease Details",
      icon: <MasksOutlinedIcon />,
      // link: "/admin/add-disease",
      dropdown: [
        {
          // icon: </>,
          title: "Disease Tabs",
          link: "/admin/disease-details/disease-tabs",
        },
        {
          // icon:</>
          title: "Add Diseases",
          link: "/admin/disease-details/Diseases",
        },
        {
          // icon:</>
          title: "All Diseases",
          link: "/admin/disease-details/alldiseases",
        },
      ],
    },
    {
      title: "App Details",
      icon: <AppShortcutOutlinedIcon />,
      dropdown: [
        {
          icon: <PsychologyOutlinedIcon />,
          title: "Body Parts",
          link: "/admin/app-details/body-parts",
        },
        {
          icon: <CoronavirusOutlinedIcon />,
          title: "Diseases",
          link: "/admin/app-details/Diseases",
        },
      ],
    },
  ];
  console.log("env", process.env.NEXT_PUBLIC_ENVIRONMENT);
  return (
    <div
      id="sidebar"
      className="sticky top-0 left-0 w-1/5 h-screen flex flex-col justify-between bg-bg-admin-sidebar"
    >
      <div className="flex justify-between bg-bg-admin-sidebar-top py-2 px-4">
        <Link href="/admin">
          <h1 className="cursor-pointer text-sidebar-title text-xl font-bold">
            Sadhana <span>{process.env.NEXT_PUBLIC_ENVIRONMENT}</span>
          </h1>
        </Link>

        <button className="flex justify-center items-center bg-bg-sidebar-button py-1 px-2 text-sm font-medium rounded-lg">
          {user?.full_name?.split(" ")[0]}
          {/* <i className="fa-solid fa-caret-down ml-1"></i> */}
        </button>
      </div>
      <div className="mt-4 h-full overflow-auto">
        <ul className="cursor-pointer p-0">
          {dashBoardItems.map((item, index) => {
            return <SidebarItems key={index} item={item} />;
          })}
        </ul>
      </div>

      <div className="bg-bg-admin-sidebar-top sticky">
        <button
          onClick={(e) => {
            e.preventDefault();
            logOut();
            // setLogOutModal(true);
          }}
          className="p-2 border-2 border-gray-600 m-3"
        >
          <LogoutOutlinedIcon></LogoutOutlinedIcon>
          Log Out
          {/* <TransparantButton
          label="Log Out"
          //  color="bg-[#8FECFF]"
          // onTap={() => setLogOutModal(true)}
          onTap = { e => {
            e.preventDefault()
            logOut()
          } } 

        /> */}
        </button>
      </div>
      {muiSpinner && (
        <div className="fixed flex justify-center items-center left-0 bg-black opacity-70 top-0 w-full h-full">
          <LoaderFunction height="100" width="100" />
        </div>
      )}
    </div>
  );
};
export default Sidebar;
