import { Theme } from "@material-ui/core";
import { blue, purple } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";
import { SET_THEME } from "../../../../../@types/client/admin/redux";

export function setTheme(theme: "dark" | "light") {
    const palletType = theme;
    const mainPrimaryColor = theme === "dark" ? purple[500] : blue[500];
    const mainSecondaryColor = theme === "dark" ? purple[900] : blue[900];
    const textColor = theme === "dark" ? "#eeeeee" : "#000000";
    const muiTheme: Theme = createMuiTheme({
        spacing: 4,
        palette: {
            type: palletType,
            primary: {
                main: mainPrimaryColor,
                contrastText: textColor,
            },
            secondary: {
                main: mainSecondaryColor
            },
        },
    });
    localStorage.setItem("admin:theme", theme);
    return {
        type: SET_THEME,
        payload: muiTheme
    };
}