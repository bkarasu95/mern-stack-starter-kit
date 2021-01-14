import { CSSProperties } from "react"
import { FilterField, IListActions, IResourceGetRequestParams } from "./form"
import { FieldItem } from './form.d'
import { IFilterFields } from './redux'

export interface INavbarProps {
    style: CSSProperties
}

export interface INavbarState {
    darkTheme: 'dark' | 'light'
}

export interface IFilterProps {
    items: Array<FilterField>
}

export interface IFilterState {
    // items: Array<any> // TODO data from server
    showFilter: boolean
}

export interface IDataTableProps {
    resourceURL: string // server get endpoint for fetching data
    fields: Array<string> // for showing data fields
    actions: IListActions // Action menu for each row
    filterFields?: Array<FilterField>  // available filter fields
    filters?: IFilterFields // active filters for fetching data
}

export interface IDataTableState {
    items: Array<any> // data from server
    fetching: boolean // server fetching status
    requestParams: IResourceGetRequestParams, // request get params
    deleteResult: string | null
    dataCount: number // fetched data count
}
export interface IDataTableComponentProps extends IDataTableProps {
    fetching?: boolean // we pass the fetching state from IDataTableState to this props
}
export interface IDataTableHeadProps extends IDataTableComponentProps {
    items: Array<any> // data from server
}
export interface IDataTableBodyProps extends IDataTableComponentProps {
    items: Array<any> // data from server
    actionResult: (result: boolean) => void // delete result in action menu "delete" button
}
export interface IDataTableFooterProps extends IDataTableComponentProps {
    dataCount: number // fetched data count
}

export interface IConfirmationDialogProps {
    opened: boolean // dialog pane opened
    actionFunction: () => void // execute the function after confirm button pressed
    closeFunction: () => void // execute the function after close button pressed
}

export interface IFormFieldLoaderProps {
    item: FieldItem // used for rendering field in this component
    style?: React.CSSProperties // component style
}

export interface ISelectFieldState {
    value?: any
}

export interface ISidebarElement {
    name: string,
    label: string,
    url?: string,
    items?: Array<ISidebarElement> // change it
}

export interface IResourceRoute {
    link: string
    serverResource?: string
}