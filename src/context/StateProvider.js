import React, {createContext, useContext, useReducer} from "react";

export const  SateContext = createContext();

export const  StateProvider = ({reducer, initialState, children}) =>(
    <SateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </SateContext.Provider>
)

export const useStateValue = () => useContext(SateContext)