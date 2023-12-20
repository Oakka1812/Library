import { createContext, useReducer } from "react";

const ThemeContext = createContext();

let ThemeReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_THEME":
      return { ...state, theme: action.payload }; //{theme: "light" , theme: "dark"} override state
      //light to dark
    default:
      return state; //{theme:light} original state
  }
};

//themecontextprovider
const ThemeContextProvider = ({ children }) => {
  let [state, dispatch] = useReducer(ThemeReducer, {
    theme: "light",
  });

  let changeTheme = (theme) => {
    //action -> type + payload -> {type,payload}
    dispatch({ type: "CHANGE_THEME", payload: theme });
  };

  let isDark = state.theme === 'dark';
  return (
    <ThemeContext.Provider value={{ ...state, isDark, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeContextProvider };
