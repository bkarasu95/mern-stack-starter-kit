import { IUser } from "../../common/user";
import { ISidebarElementProps } from "./components";

export interface ISidebarProps {
    user: IUser;
}

export interface ISidebarState {
    listItems: Array<ISidebarElementProps>
}


export interface INavbarProps {
    style: React.CSSProperties
}

export interface INavbarState {
    darkTheme: 'dark' | 'light'
}

