import { FormEvent } from "react"
import { Message } from "./redux"

export interface FieldItem {
  label?: string // 
  type: "number" | "text" | "switch" | "image" | "wysiwyg" | "select" // component type
  name: string // form input name for requests
  options?: Array<{ value: string | number, text: string }> // select options
  required?: boolean // required input 
  initialValue?: any // init input value
}

export interface FilterField extends FieldItem {
  label: string // 
  type: "number" | "text" | "switch" | "select" // component type
  name: string // filter input name
}

export interface IFilter {
  name: string
  value: string
}

export interface IFieldItemState {
  value: string | null | number | boolean
}

export interface ICustomFormProps {
  items: Array<FieldItem> // form input items
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void // handle form submit
  footerComponent?: any // pass the custom component to this component's footer
}

export type ListAction = "edit" | "delete" | "show"

export interface IListActions {
  [key: number]: ListAction
}

export interface IActionMenuState {
  opened: any // is menu opened
  dialogOpened: boolean
}
export interface IActionMenuProps {
  url: string
  actions: IListActions
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