import React from "react";
import { Helmet } from "react-helmet";
import { reduxForm } from "redux-form";
import { ICreatePageProps } from "../../../../../@types/client/admin/pages";
import { trans } from "../../../../common/resources/lang/translate";
import { jsonToFormData } from "../../../resources/helpers/form";
import CustomForm from "../../components/form/CustomForm";
import ApiRequest from "../../libraries/ApiRequest";

const CreateForm = (props) => {
  const { handleSubmit, items } = props;
  return <CustomForm handleSubmit={handleSubmit} items={items} />;
};

let CreateFormRedux: any = reduxForm({
  form: "createForm", // a unique name for the form,
})(CreateForm);

class CreatePage extends React.Component<ICreatePageProps> {
  submit = (values: object) => {
    const requester = new ApiRequest();
    let fd = jsonToFormData(values);
    requester.post(this.props.apiURL, fd);
  };
  render() {
    return (
      <>
        <Helmet>
          <title>{trans("resource.add", { item: this.props.name })}</title>
        </Helmet>
        <CreateFormRedux onSubmit={this.submit} items={this.props.items} />
      </>
    );
  }
}
export default CreatePage;
