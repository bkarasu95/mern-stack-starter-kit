import { CSSProperties } from "react";
import { IListActions, IResourceGetRequestParams } from "./form";

export interface INavbarProps {
    style: CSSProperties
}

export interface INavbarState {
    darkTheme: 'dark' | 'light'
}

export interface IDataTableProps {
    resourceURL: string
    themeClass: string | null
    fields: Array<string>; // for showing data fields
    actions: IListActions;
}

export interface IDataTableState {
    items: Array<any>; // data from server
    fetching: boolean;
    requestParams: IResourceGetRequestParams
}