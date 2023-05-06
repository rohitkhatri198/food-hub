import React, { useEffect, useState } from "react";
import HomeContainer from "./HomeContainer";
import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/StateProvider";

const MainContainer = () => {
  const [{foodItems}] = useStateValue();
  const [scroll, setScroll] = useState(0)  
  useEffect(() => {
    
  
    return () => {
      
    }
  }, [scroll])
  

  return (
    <div className="flex w-full h-auto justify-center items-center flex-col">
      <HomeContainer />
      <section className="w-full my-6">
        <div className="flex items-center justify-between w-full ">
          <h1 className='text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content-[""] before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-br from-orange-400 to-orange-600 transition-all ease-in-out duration-100'>
            Our fresh & Healthy Fruits
          </h1>

          <div className="hidden md:flex gap-3 items-center">
            <motion.div
              whileTap={{ scale: 0.85 }}
              className="w-8 h-8 text-2xl text-white rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center"
              onClick={()=>setScroll(-400)}
            >
              <MdChevronLeft />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.85 }}
              className="w-8 h-8 text-2xl text-white rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center"
              onClick={()=>setScroll(400)}
            >
              <MdChevronRight />
            </motion.div>
          </div>
        </div>
        <RowContainer scroll={scroll} flag={true} data={foodItems?.filter(n => n.category==="fruits")}/>
      </section>
    </div>
  );
};

export default MainContainer;
