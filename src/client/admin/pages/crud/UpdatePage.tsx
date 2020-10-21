import React from "react";
import { Helmet } from "react-helmet";
import { reduxForm } from "redux-form";
import {
  IUpdatePageProps,
  IUpdatePageState
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
    let items = null;
    requester
      .get(this.props.resource + "/" + this.props.id)
      .then((res: any) => {
        let data: object = res.data.data;
        items = this.state.items;
        for (let key in data) {
          for (let item in items) {
            if (items[item].name === key) {
              items[item].initialValue = data[key];
              break;
            }
          }
        }
      })
      .then(() => {
        this.setState({ fetching: false, items: items });
      });
  }
  submit = (values: object) => {
    const requester = new ApiRequest();
    let fd = jsonToFormData(values);
    requester.put(this.props.resource + "/" + this.props.id, fd);
  };
  render() {   
    return (
      <>
        <Helmet>
          <title>{trans("resource.update", { item: this.props.name })}</title>
        </Helmet>
        {this.state.fetching ? (
          <p>Yükleniyor... </p>
        ) : (
          <UpdateFormRedux onSubmit={this.submit} items={this.state.items} />
        )}
      </>
    );
  }
}

export default UpdatePage;
