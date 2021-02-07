export interface IGridProperties {
    fields: Array<string>
    actions: IListActions
    disableAdd?: boolean; // disables the Add button in list
    filterItems?: Array<FilterField>
}

export interface IFormProperties {
    items: Array<IFieldItem>
}


export interface IShowProperties {
    items: Array<IFieldItem>
}
interface FilterField extends IFieldItem {
    label: string // 
    type: "number" | "text" | "switch" | "select" // component type
    name: string // filter input name
}

interface IFieldItem {
    type: "number" | "text" | "switch" | "image" | "wysiwyg" | "select" | "object" // component type
    name: string // form input name for requests
    label?: string // form label
    options?: Array<{ value: string | number, text: string }> // select options
    required?: boolean // required input 
    initialValue?: any // init input value
    disabled?: boolean // init input value
}

interface IListActions {
    [key: number]: "edit" | "delete" | "show"
}