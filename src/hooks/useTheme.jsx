import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function useTheme() {
    let contexts = useContext(ThemeContext);
    if(contexts === undefined){
        new Error('using theme context out of ThemeContextProvider')
    }
    return contexts; //{theme : 'dark', changeTheme function}
}