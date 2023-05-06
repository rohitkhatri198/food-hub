import React, { useEffect, useRef } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";

const RowContainer = ({ flag, data, scroll }) => {
  console.log(data);
  const rowRef = useRef();
  useEffect(() => {
    rowRef.current.scrollLeft += scroll;
  }, [scroll]);

  return (
    <div
      ref={rowRef}
      className={`w-full my-12 flex gap-2 items-center ${
        flag ? "overflow-x-scroll scroll-smooth hideScroll" : "overflow-x-hidden flex-wrap"
      }`}
    >
      {data &&
        data.map((item) => (
          <div className="w-300 min-w-[300px] md:min-w-[340px] md:w-340 h-auto  my-12 bg-cardOverlay rounded-lg p-4  hover:drop-shadow-lg backdrop-blur-lg">
            <div
              key={item.id}
              className="flex justify-between items-center w-full"
            >
              <motion.img
                whileHover={{ scale: 1.2 }}
                src="https://firebasestorage.googleapis.com/v0/b/food-hub-ce044.appspot.com/o/Images%2F1683375715455-f10.png?alt=media&token=d970c2b2-24df-418c-88c2-ed398f2e4c4c"
                className="w-40 p-2 drop-shadow-2xl -mt-8"
                alt=""
              />
              <motion.div
                whileTap={{ scale: 0.85 }}
                className="w-8 h-8 rounded-full flex items-center justify-center p-2 cursor-pointer hover:shadow-md bg-red-600"
              >
                <MdShoppingBasket className="text-white " />
              </motion.div>
            </div>

            <div className="flex flex-col justify-end  items-end w-full">
              <p className="text-textColor font-semibold text-base md:text-lg">
                Chocalte & Vanilla
              </p>
              <p className="mt-1 text-sm text-gray-500 ">45 calories</p>
              <div className="flex items-center gap-8"></div>
              <p className="text-lg text-textColor font-semibold">
                <span className="text-sm text-red-500">$</span>5.25
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default RowContainer;
