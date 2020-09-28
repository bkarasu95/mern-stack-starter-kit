import React from "react";
import { Helmet } from "react-helmet";
import { RouteComponentProps } from "react-router-dom";
import { reduxForm } from "redux-form";
import {
  IUpdatePageProps,
  IUpdatePageState,
} from "../../../../../@types/client/admin/pages";
import { trans } from "../../../../common/resources/lang/translate";
import { jsonToFormData } from "../../../resources/helpers/form";
import CustomForm from "../../components/form/CustomForm";
import ApiRequest from "../../libraries/ApiRequest";

const UpdateForm = (props) => {
  const { handleSubmit, items } = props;
  return <CustomForm handleSubmit={handleSubmit} items={items} />;
};

let UpdateFormRedux: any = reduxForm({
  form: "updateForm", // a unique name for the form,
})(UpdateForm);

class UpdatePage extends React.Component<IUpdatePageProps, IUpdatePageState> {
  constructor(props) {
    super(props);
    this.state = {
      fetching: true,
      items: this.props.items,
    };
  }
  componentDidMount() {
    const requester = new ApiRequest();
    requester.get(this.props.apiURL + "/" + this.props.id).then((res: any) => {
      let data: object = res.data.data;
      let items = this.state.items;
      for (let key in data) {
        items[key].default = data[key];
      }
      this.setState({ fetching: false, items: items });
    });
  }
  submit = (values: object) => {
    const requester = new ApiRequest();
    let fd = jsonToFormData(values);
    requester.put(this.props.apiURL, fd);
  };
  render() {
    return (
      <>
        <Helmet>
          <title>{trans("resource.update", { item: this.props.name })}</title>
        </Helmet>
        <UpdateFormRedux onSubmit={this.submit} items={this.props.items} />
      </>
    );
  }
}

export default UpdatePage;
