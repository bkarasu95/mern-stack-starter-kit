import { Button } from "@material-ui/core"
import { CSSProperties } from "react"
import { FilterField, IListActions, IResourceGetRequestParams } from "./form"
import { FieldItem } from './form.d'
import { IFilterFields } from './redux'

export interface IFilterProps {
    items: Array<FilterField>
}

export interface IFilterState {
    // items: Array<any> // TODO data from server
    showFilter: boolean
}

export interface IDataTableProps {
    resourceURL: string // server fetching data, gets from server
    fields: Array<string> // for showing data fields, gets from server
    actions: IListActions // Action menu for each row, gets from server
    filterFields?: Array<FilterField>  // available filter fields, gets from server
    filters?: IFilterFields // active filters for fetching data
}

export interface IDataTableState {
    items: Array<any> // data from server
    fetching: boolean // server fetching status
    requestParams: IResourceGetRequestParams, // request get params
    deleteResult: string | null
    dataCount: number // fetched data count
    currentPage: number // current data page
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
    limit: number // limit the fetch data
    currentPage: number // current data page
    pageChange: (count: number) => void // handle the page change
    dataLengthChange: (length: number) => void // handle the limit change
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

export interface IResourceRoute {
    link: string
    serverResource?: string
}

export interface ISliderButtonProps {
    buttonCount: number // total button count
    buttonClickHandler: (page: number) => void // handle the click for every button
    activeButton: number // current button
}
export interface ISliderButtonState {
    activeButton: number // current button, it can manipulated by its props.
}

interface IMenuItemProps {
    item: ISidebarElementProps
}

export interface INestedListProps {
    items: Array<ISidebarElementProps>
}

export interface ISidebarElementProps {
    name: string // unique name of element
    label: string // this will show on ui 
    url?: string // page url
    children?: Array<ISidebarElementProps> // children elements
}

interface IMultiLevelState {
    opened: boolean // is dropdown opened
}