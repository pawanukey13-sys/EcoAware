import { useTheme } from "../../ThemeContext/Context";
import "./Themetoggle.css"
export default function Toggletheme({mobile = false}){
    const {darkMode,toggletheme} = useTheme();
    return (
        <button className={mobile ? "Theme-toggle-mobile" : "Theme-toggle"} onClick={toggletheme}>
            {darkMode? "☀️":"🌙"}
        </button>
    )
}