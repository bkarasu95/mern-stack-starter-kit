import { FieldItem, IListActions, IResourceGetRequestParams } from "./form";
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
  redirectURL: string | null
}

interface ICreatePageProps extends ICrudPageProps {
  items: Array<FieldItem>;
}

interface ICreatePageState extends ICrudPageState {

}

interface IUpdatePageProps extends ICrudPageProps {
  items: Array<FieldItem>;
  id: string;
}

interface IUpdatePageState {
  items: Array<FieldItem>; // we will modify this object for setting default value
  fetching: boolean;
}

interface IListPageProps extends ICrudPageProps {
  fields: Array<string>; // for showing data fields
  actions: IListActions;
  disableAdd?: boolean; // disables the Add button in list
}

interface IListPageState {
  items: Array<any>; // data from server
  fetching: boolean;
  requestParams: IResourceGetRequestParams
}


export interface IResourceRouteProps {
  resource: string
}