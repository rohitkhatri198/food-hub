import React, { useEffect, useState } from "react";
import Logo from "../images/logo.png";
import Avatar from "../images/avatar.png";
import { motion } from "framer-motion";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [isMenu, setIsMenu] = useState(false);
  const [{ user, cartShow }, dispatch] = useStateValue();
  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };

  const logout = () => {
    setIsMenu(true);
    localStorage.clear();
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };
  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  return (
    <header className="fixed w-screen z-50 p-3    px-4  md:px-16 md:p-6 bg-primary onClick={()=>{setIsMenu(true)}}">
      <div className="flex w-full h-full items-center justify-between">
        <motion.div
          whileTap={{ scale: 0.9 }}
          className=" flex md:hidden relative select-none  justify-center items-center cursor-pointer"
          onClick={showCart}
        >
          <MdShoppingBasket className="text-textColor text-2xl"></MdShoppingBasket>
          <div className="w-4 h-4 absolute -top-3 -right-2 rounded-full flex items-center justify-center bg-cartNumBg">
            <span className="text-xs text-white font-semibold">5</span>
          </div>
        </motion.div>
        <Link to={"/"} className="flex items-center gap-2">
          <motion.img
            whileTap={{ scale: 0.9 }}
            src={Logo}
            alt="logo"
            className="w-10 object-cover"
          />
          <h1 className="text-black font-extrabold text-xl">
            Food <span className="bg-orange-400 p-1 rounded-md">Hub</span>
          </h1>
        </Link>

        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className=" hidden md:flex items-center gap-8"
          >
            <li
              onClick={() => {
                setIsMenu(true);
              }}
              className="text-base text-textColor hover:text-headingColor transition-all duration-100 ease-in-out cursor-pointer"
            >
              Home
            </li>
            <li
              onClick={() => {
                setIsMenu(true);
              }}
              className="text-base text-textColor hover:text-headingColor transition-all duration-100 ease-in-out cursor-pointer"
            >
              Menu
            </li>
            <li
              onClick={() => {
                setIsMenu(true);
              }}
              className="text-base text-textColor hover:text-headingColor transition-all duration-100 ease-in-out cursor-pointer"
            >
              About Us
            </li>
            <li
              onClick={() => {
                setIsMenu(true);
              }}
              className="text-base text-textColor hover:text-headingColor transition-all duration-100 ease-in-out cursor-pointer"
            >
              Service
            </li>
          </motion.ul>
          <motion.div
            whileTap={{ scale: 0.9 }}
            className=" hidden relative select-none md:flex justify-center items-center cursor-pointer"
            onClick={showCart}
          >
            <MdShoppingBasket className="text-textColor text-2xl"></MdShoppingBasket>
            <div className="w-4 h-4 absolute -top-3 -right-2 rounded-full flex items-center justify-center bg-cartNumBg">
              <span className="text-xs text-white font-semibold">5</span>
            </div>
          </motion.div>
          <div className="relative" onClick={login}>
            <motion.img
              whileTap={{ scale: 0.9 }}
              src={user ? user.photoURL : Avatar}
              alt="avatar"
              className="w-10 h-10 min-h-[40px] cursor-pointer drop-shadow-2xl flex justify-center items-center rounded-full min-w-[40px]"
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 shadow-xl bg-gray-50 rounded-lg flex flex-col absolute top-12 right-0 "
              >
                {user && user.email === "khatrirohit198@gmail.com" && (
                  <Link to={"/createItem"}>
                    <div
                      className="flex px-4 py-2 items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base"
                      onClick={() => {
                        setIsMenu(true);
                      }}
                    >
                      New Item
                      <MdAdd />
                    </div>
                  </Link>
                )}
                <ul className=" flex flex-col   md:hidden">
                  <li
                    onClick={() => {
                      setIsMenu(true);
                    }}
                    className="text-base px-4 py-2 text-textColor hover:text-headingColor transition-all duration-100 ease-in-out cursor-pointer"
                  >
                    Home
                  </li>
                  <li
                    onClick={() => {
                      setIsMenu(true);
                    }}
                    className="text-base px-4 py-2 text-textColor hover:text-headingColor transition-all duration-100 ease-in-out cursor-pointer"
                  >
                    Menu
                  </li>
                  <li
                    onClick={() => {
                      setIsMenu(true);
                    }}
                    className="text-base px-4 py-2 text-textColor hover:text-headingColor transition-all duration-100 ease-in-out cursor-pointer"
                  >
                    About Us
                  </li>
                  <li
                    onClick={() => {
                      setIsMenu(true);
                    }}
                    className="text-base px-4 py-2 text-textColor hover:text-headingColor transition-all duration-100 ease-in-out cursor-pointer"
                  >
                    Service
                  </li>
                </ul>
                <div
                  className="flex m-2 px-4 py-2 rounded-md shadow-md  justify-center items-center gap-3 cursor-pointer bg-gray-200 hover:bg-slate-300 transition-all duration-100 ease-in-out text-textColor text-base"
                  onClick={logout}
                >
                  Logout
                  <MdLogout />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
