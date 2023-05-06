import React from "react";
import { easeIn, easeInOut, motion } from "framer-motion";
import Delivery from "../images/delivery.png";
import HeroBg from "../images/heroBg.png";
import { heroData } from "../utils/data";
const HomeContainer = () => {
  return (
    <section id="home" className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
      <div className="py-2 flex flex-col gap-6 overflow-x-hidden items-start  flex-1">
        <div className="flex items-center gap-2 justify-center bg-orange-100 px-2 py-1 rounded-full ">
          <div className="text-orange-500 text-base font-semibold">
            Bike Delivery
          </div>
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-6 rounded-full bg-white drop-shadow-xxl h-6 overflow-hidden"
          >
            <img
              src={Delivery}
              className="w-full h-full object-contain"
              alt="delivery"
            />
          </motion.div>
        </div>
        <h1 className="text-[2.5rem] lg:text-[4.25rem] overflow-x-hidden font-bold tracking-wide text-headingColor">
          The Fastest Delivery in
          <span className="text-[3rem] lg:text-[5rem] text-orange-600">
            Your City
          </span>
        </h1>
        <div className="text-textColor text-center md:text-left md:w-[80%] text-base">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic laborum
          perspiciatis consectetur quisquam omnis, eius quo qui, similique nihil
          saepe adipisci ipsam quaerat libero aspernatur, aliquid repellat
          commodi dicta. Consectetur.
        </div>
        <button
          type="button"
          className="bg-gradient-to-br duration-100 from-orange-400 to-orange-500 w-full md:w-auto rounded-lg py-2 px-4 shadow-xl active:scale-[0.92] transition-all ease-in-out"
        >
          Order Now
        </button>
      </div>
      <div className="py-2 flex items-center relative flex-1">
        <img
          src={HeroBg}
          alt="heroBg"
          className="ml-auto h-370 w-full lg:w-auto lg:h-650"
        />
        <div className="w-full h-full absolute top-0 left-0 md:px-10 lg:px-32 py-4 flex items-center gap-4 flex-wrap justify-center">
          {heroData &&
            heroData.map((i) => (
              <div
                key={i.id}
                className="lg:w-190  p-2 bg-cardOverlay drop-shadow-xl rounded-3xl backdrop-blur-md flex items-center justify-center flex-col"
              >
                <img src={i.src} className="w-20 lg:w-40 -mt-10 lg:-mt-20" alt="bevrages" />
                <div className="text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4">
                  {i.name}
                </div>
                <div className="text-[12px] lg:text-sm text-lighttextGray  font-semibold my-1 lg:my-4">
                  {i.desc}
                </div>
                <div className="text-sm font-semibold text-headingColor">
                  <span className="text-sx text-red-600">$</span>
                  {i.price}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;
