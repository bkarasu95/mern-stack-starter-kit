import { FieldItem, IListActions } from "./form";

export interface ILoginPageProps {}

export interface ILoginPageState {
  username: string;
  password: string;
}

export interface ICrudPageProps {
  name: string;
  apiURL: string;
}

interface ICreatePageProps extends ICrudPageProps {
  items: Array<FieldItem>;
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
}

interface IListPageState {
  items: Array<any>; // data from server
  fetching: boolean;
}
