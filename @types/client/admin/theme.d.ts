import { Theme, ThemeOptions } from "@material-ui/core/styles/createMuiTheme";
import { Palette, PaletteColor, PaletteColorOptions, PaletteOptions } from "@material-ui/core/styles/createPalette";

interface ITheme extends Theme {
    palette: IPalette;
}

interface IPaletteOptions extends PaletteOptions {
    third?: PaletteColorOptions;
}

interface IPalette extends Palette {
    third?: PaletteColor;
}

interface IThemeOptions extends ThemeOptions {
    palette: IPalette;
}

