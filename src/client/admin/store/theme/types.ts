import { Theme } from "@material-ui/core";

export const SET_THEME = "SET_THEME";

interface setTheme {
  type: typeof SET_THEME;
  theme: Theme;
}
