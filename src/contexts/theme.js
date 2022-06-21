import React, { createContext } from "react";

export const ThemeContext = createContext();


export const ThemeProvider = ({ children}) => {
    return (
        <ThemeContext.Provider value="fooobar">{children}</ThemeContext.Provider>
    )
}