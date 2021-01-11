import { Button, Checkbox, FormControlLabel } from "@material-ui/core";
import React from "react";
import { Helmet } from "react-helmet";
import { Redirect } from "react-router-dom";
import { reduxForm } from "redux-form";
import { store } from '..';
import { ICreatePageProps, ICreatePageState } from "../../../../@types/client/admin/pages";
import { trans } from "../../../common/resources/lang/translate";
import { jsonToFormData } from "../../resources/helpers/form";
import CustomForm from "../components/form/CustomForm";
import ResultMessageBox from "../components/form/ResultMessageBox";
import ApiRequest from "../libraries/ApiRequest";
import { showServerResult } from '../store/result/actions';

class CreateFormFooter extends React.Component {
  render() {
    const submitStyle: React.CSSProperties = {
      marginLeft: "auto",
      marginTop: "10px",
    };
    return (
      <>
        {/** TODO add the functionality, it has no effect for now */}
        <FormControlLabel
          value="continue"
          control={<Checkbox color="primary" checked={false} />}
          label="Oluşturmaya Devam Et"
          labelPlacement="start"
        />
        <Button
          type="submit"
          style={submitStyle}
          variant="contained"
          color="primary"
        >
          {trans("resource.add", { item: "Ürün" })}
        </Button>
      </>
    );
  }
}

const CreateForm = (props) => {
  const { handleSubmit, items } = props;
  return <CustomForm footerComponent={<CreateFormFooter />} handleSubmit={handleSubmit} items={items} />;
};

let CreateFormRedux: any = reduxForm({
  form: "createForm", // a unique name for the form,
})(CreateForm);

class CreatePage extends React.Component<ICreatePageProps, ICreatePageState> {
  constructor(props) {
    super(props);
    this.state = {
      // TODO make this redirecting global using redux.
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