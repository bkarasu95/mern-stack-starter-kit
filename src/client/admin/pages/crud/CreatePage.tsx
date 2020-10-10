import React from "react";
import { Helmet } from "react-helmet";
import { Redirect } from "react-router-dom";
import { reduxForm } from "redux-form";
import { store } from '../../';
import { ICreatePageProps, ICreatePageState } from "../../../../../@types/client/admin/pages";
import { trans } from "../../../../common/resources/lang/translate";
import { jsonToFormData } from "../../../resources/helpers/form";
import CustomForm from "../../components/form/CustomForm";
import ResultMessageBox from "../../components/form/ResultMessageBox";
import ApiRequest from "../../libraries/ApiRequest";
import { showServerResult } from './../../store/result/actions';

const CreateForm = (props) => {
  const { handleSubmit, items } = props;
  return <CustomForm handleSubmit={handleSubmit} items={items} />;
};

let CreateFormRedux: any = reduxForm({
  form: "createForm", // a unique name for the form,
})(CreateForm);

class CreatePage extends React.Component<ICreatePageProps, ICreatePageState> {
  constructor(props) {
    super(props);
    this.state = {
      redirectURL: null
    }
  }
  submit = (values: object) => {
    const requester = new ApiRequest();
    let fd = jsonToFormData(values);
    requester.post(this.props.resource, fd).then((res: any) => {     
      if (res.status === 200) {
        store.dispatch(showServerResult('success', res.data.message));
        this.setState({ redirectURL: "/" + this.props.resource })
      } else if (res.status >= 400 && res.status <= 499) {       
        store.dispatch(showServerResult('warning', res.data.message));
      } else if (res.status >= 500) {
        store.dispatch(showServerResult('error', res.data.message));
      }
    });
  };
  render() {
    return (
      <>
        {this.state.redirectURL ? (<Redirect to={this.state.redirectURL} />) : (
          <>
            <Helmet>
              <title>{trans("resource.add", { item: this.props.name })}</title >
            </Helmet >
            <ResultMessageBox />

            <CreateFormRedux onSubmit={this.submit} items={this.props.items} />
          </>)
        }
      </>
    );
  }
}

export default CreatePage;