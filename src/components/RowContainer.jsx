import React, { useEffect, useRef, useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import NotFound from "../images/NotFound.svg";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const RowContainer = ({ flag, data, scroll }) => {
  // console.log(data);
  const rowRef = useRef();
  
  const [{ user, cartItems }, dispatch] = useStateValue();
  useEffect(() => {
    rowRef.current.scrollLeft += scroll;
  }, [scroll]);

  const addtobasket = (item) => {
    if (user) {
      const updatedCartItems = [...cartItems, item];
      dispatch({
        type: actionType.SET_CART_ITEMS,
        cartItems: updatedCartItems,
      });
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    }else{
      alert("Please login to add to cart");
    }
  };

  return (
    <div
      ref={rowRef}
      className={`w-full my-12 flex gap-2 items-center ${
        flag
          ? "overflow-x-scroll scroll-smooth hideScroll"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item?.id}
            className="w-275 h-[212px] min-w-[275px] md:min-w-[300px] md:w-300 flex flex-col justify-evenly relative my-12 bg-cardOverlay rounded-lg p-4  hover:drop-shadow-lg backdrop-blur-lg"
          >
            <div className="flex justify-between items-center w-full">
              <motion.div
                className="w-40 h-40 p-2 drop-shadow-2xl -mt-8"
                whileHover={{ scale: 1.2 }}
              >
                <img
                  src={item?.imageURL}
                  className="w-full h-full object-contain"
                  alt=""
                />
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.85 }}
                className="w-8 h-8 rounded-full flex items-center justify-center p-2 cursor-pointer hover:shadow-md bg-red-600"
                onClick={() => addtobasket(item)}
              >
                <MdShoppingBasket className="text-white " />
              </motion.div>
            </div>

            <div className="flex flex-col justify-end  items-end w-full">
              <p className="text-textColor font-semibold text-base md:text-lg">
                {item?.title}
              </p>
              <p className="mt-1 text-sm text-gray-500 ">
                {item?.calories} calories
              </p>
              <div className="flex items-center gap-8"></div>
              <p className="text-lg text-textColor font-semibold">
                <span className="text-sm text-red-500">$</span>
                {item?.price}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="flex w-full flex-col justify-center items-center">
          <img src={NotFound} alt="notFound" className="h-420" />
          <p className="text-headingColor text-xl my-8 font-semibold">
            Items not available
          </p>
        </div>
      )}
    </div>
  );
};

export default RowContainer;
