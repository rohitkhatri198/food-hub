import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { motion } from "framer-motion";
import { RiRefreshFill } from "react-icons/ri";
import { BiMinus, BiPlus } from "react-icons/bi";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import EmptyCart from "../images/emptyCart.svg";
const CartContainer = () => {
  const [{ cartShow, cartItems, user }, dispatch] = useStateValue();
  const [qty, setQty] = useState(1);
  const [items, setItems] = useState([]);
  const [tot, setTot] = useState(0);
  const[flag, setFlag]=useState(1)
  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };
  const cartDispatch = () => {
    localStorage.setItem("cartItems", JSON.stringify(items));
    dispatch({
        type:actionType.SET_CART_ITEMS,
        cartItems:items,
    })
  };
  const updateQty = (action, id) => {
    if (action === "add") {
      setQty(qty + 1);
      cartItems.map((item) => {
        if (item.id === id) {
          item.qty += 1;
          setFlag(flag + 1);
        }
      });
      cartDispatch();
    } else {
      // initial state value is one so you need to check if 1 then remove it
      if (qty === 1) {
        items = cartItems.filter((item) => item.id !== id);
        setFlag(flag + 1);
        cartDispatch();
      } else {
        setQty(qty - 1);
        cartItems.map((item) => {
          if (item.id === id) {
            item.qty -= 1;
            setFlag(flag + 1);
          }
        });
        cartDispatch();
      }
    }
  };
  useEffect(() => {
    let totalPrice = cartItems.reduce(function (accumulator, item) {
      return accumulator + item.qty * item.price;
    }, 0);
    setTot(totalPrice);
    console.log(tot);
  }, [flag, cartItems, tot]);
  useEffect(() => {
    setItems(cartItems)
  }, [cartItems,qty]);

  const clearCart = () => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: [],
    });

    localStorage.setItem("cartItems", JSON.stringify([]));
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="w-full md:w-375 z-[101] bg-white drop-shadow-md flex flex-col fixed top-0 right-0 h-screen"
    >
      <div className="flex items-center justify-between p-4 w-full cursor-pointer">
        <motion.div whileTap={{ scale: 0.75 }} onClick={showCart}>
          <MdOutlineKeyboardBackspace className="text-textColor text-3xl" />
        </motion.div>
        <p className="text-textColor text-lg font-semibold">Cart</p>
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={clearCart}
          className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md  cursor-pointer text-textColor text-base"
        >
          Clear <RiRefreshFill />
        </motion.div>
      </div>
      {/* bottom */}
      {cartItems && cartItems.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 300 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 300 }}
          className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col"
        >
          {/* cartSection */}
          <div className="w-full h-340 md:h-42 px-6  py-10 flex flex-col gap-3 overflow-y-scroll hideScroll ">
            {/* cartItems */}
            {cartItems &&
              cartItems.map((item) => (
                <div
                  key={item}
                  className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2"
                >
                  <img
                    src={item?.imageURL}
                    className="w-10 h-20 max-w-[60px] rounded-full object-contain"
                    alt=""
                  />
                  <div className="flex flex-col gap-1">
                    <p className="text-base text-gray-50">{item?.title}</p>
                    <p className="text-sm block text-gray-300 font-semibold ">
                      ${item?.price * qty}
                    </p>
                  </div>
                  <div className="group flex items-center gap-2 ml-auto cursor-pointer">
                    <motion.div
                      whileTap={{ scale: 0.75 }}
                      onClick={() => updateQty("remove", item?.id)}
                    >
                      <BiMinus className="text-gray-50" />
                    </motion.div>
                    <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
                      {qty}
                    </p>
                    <motion.div
                      whileTap={{ scale: 0.75 }}
                      onClick={() => updateQty("add", item?.id)}
                    >
                      <BiPlus className="text-gray-50" />
                    </motion.div>
                  </div>
                </div>
              ))}
          </div>
          {/* cartTotal */}
          <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Sub Total</p>
              <p className="text-gray-400 text-lg">${tot} </p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Delivery</p>
              <p className="text-gray-400 text-lg">$ 2.5 </p>
            </div>
            <div className="w-full border-b border-gray-600 my-2"></div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-200 text-xl font-semibold">Total</p>
              <p className="text-gray-200 text-xl font-semibold">${tot + 2.5}</p>
            </div>
            {user ? (
              <motion.button
                whileTap={{ scale: 0.9 }}
                type="button"
                className="w-full p-2 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg  "
              >
                Check Out
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.9 }}
                type="button"
                className="w-full p-2 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg  "
              >
                Log In
              </motion.button>
            )}
          </div>
        </motion.div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center  gap-6">
          <img src={EmptyCart} alt="emptyCart" className="w-300" />
          <p className="text-xl text-textColor font-semibold">
            Add some items to your Cart
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default CartContainer;
