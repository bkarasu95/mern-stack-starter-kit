import { FormEvent } from "react"
import { Message } from "./redux"

export interface FieldItem {
  label?: string // label of input
  type: "number" | "text" | "switch" | "image" | "wysiwyg" | "select" // component type
  name: string // form input name for requests
  options?: Array<{ value: string | number, text: string }> // select options
  required?: boolean // required input 
  initialValue?: any // init input value
}

export interface IFieldItemState {
  value: string | null | number | boolean
}

export interface FilterField extends FieldItem {
  label: string // label of filter input
  type: "number" | "text" | "switch" | "select" // component type
  name: string // filter input name
}

export interface IFilter { // filter fields that used by request query param
  name: string // query key
  value: string // query value
}

export interface ICustomFormProps {
  items: Array<FieldItem> // form input items
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void // handle form submit
  footerComponent?: any // pass the custom component to this component's footer
}

export type ListAction = "edit" | "delete" | "show" // active the list action menu

export interface IListActions { // array of ListAction
  [key: number]: ListAction
}

export interface IActionMenuState {
  opened: any // is menu opened
  dialogOpened: boolean // is confirm(or something else) dialog opened
}
export interface IActionMenuProps {
  url: string
  actions: IListActions // available actions
  actionResult: (result: boolean) => void
}

export interface IResultMessageBoxProps {
  result: Message | null
}

export interface IFormPostRequestFields {
  [key: string]: string
}

export interface IResourceGetRequestParams {
  limit?: number // server query data limit
  start?: number // server query data offset 
  orderBy?: string // server query order the data
  search?: string // server query where the data
}


interface IReduxFormProps {
  input?: any; // we must include this for all input fields that use redux form
}