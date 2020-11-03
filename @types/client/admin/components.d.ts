import { CSSProperties } from "react";
import { IListActions, IResourceGetRequestParams } from "./form";
import { FieldItem } from './form.d';

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
    requestParams: IResourceGetRequestParams,
    deleteResult: string | null;
    dataCount: number;
}
export interface IDataTableComponentProps extends IDataTableProps {
}
export interface IDataTableHeadProps extends IDataTableComponentProps {
    items: Array<any>; // data from server
}
export interface IDataTableBodyProps extends IDataTableComponentProps {
    items: Array<any>; // data from server
    actionResult: (result: boolean) => void
}
export interface IDataTableFooterProps extends IDataTableComponentProps {
    dataCount: number;
    items?: null;
}

export interface IConfirmationDialogProps {
    opened: boolean;
    actionFunction: () => void;
    closeFunction: () => void;
}

export interface IFormFieldLoaderProps {
    item: FieldItem;
}

export interface ISidebarElement {
    name: string,
    label: string,
    url?: string,
    items?: Array<ISidebarElement>; // change it
}