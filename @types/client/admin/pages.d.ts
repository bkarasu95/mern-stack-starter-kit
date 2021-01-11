import { FieldItem, FilterField, IListActions, IResourceGetRequestParams } from "./form";
import { Message } from "./redux";

export interface ILoginPageProps { }

export interface ILoginPageState {
  username: string;
  password: string;
}

export interface IAuthenticatedPageProps {
  result: Message | null
  theme: any
}

export interface ICrudPageProps {
  name: string;
  resource: string;
}

export interface ICrudPageState {

}

interface ICreatePageProps extends ICrudPageProps {
  items: Array<FieldItem>; // form input fields
}

interface ICreatePageState extends ICrudPageState {
  redirectURL: string | null // TODO add this to app-wide system
}

interface IUpdatePageProps extends ICrudPageProps {
  items: Array<FieldItem>; // form input fields
  id: string; // id of resource
}

interface IUpdatePageState {
  items: Array<FieldItem>; // we will modify this object for setting initial input values. so pass items props to state
  fetching: boolean;
}

interface IListPageProps extends ICrudPageProps {
  fields: Array<string>; // for showing data fields
  actions: IListActions;
  disableAdd?: boolean; // disables the Add button in list
  filterItems?: Array<FilterField>
}
export interface IResourceRouteProps {
  resource: string
}