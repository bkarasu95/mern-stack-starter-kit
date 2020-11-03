import { FormControl } from "@material-ui/core";
import React from "react";
import { Field } from "redux-form";
import { IFormFieldLoaderProps } from "../../../../../@types/client/admin/components";
import { trans } from "../../../../common/resources/lang/translate";
import CustomSwitch from "./CustomSwitch";
import CustomTextInput from "./CustomTextInput";
import ImageUploader from "./ImageUploader";
import WYSIWYG from "./WYSIWYG";

class FormFieldLoader extends React.Component<IFormFieldLoaderProps> {
    render() {
        let component = null;
        switch (this.props.item.type) {
            case "text":
            case "number":
                component =
                    <Field
                        name={this.props.item.name}
                        label={
                            this.props.item.label
                                ? trans("db." + this.props.item.label)
                                : trans("db." + this.props.item.name)
                        }
                        component={CustomTextInput}
                        {...this.props.item}
                    />;
                break;
            case "wysiwyg":
                component =
                    <Field
                        name={this.props.item.name}
                        component={WYSIWYG}
                        label={
                            this.props.item.label
                                ? trans("db." + this.props.item.label)
                                : trans("db." + this.props.item.name)
                        }
                        {...this.props.item}
                    />
                break;
            case "switch":
                component =
                    <Field
                        name={this.props.item.name}
                        label={
                            this.props.item.label
                                ? trans("db." + this.props.item.label)
                                : trans("db." + this.props.item.name)
                        }
                        component={CustomSwitch}
                        {...this.props.item}
                    />;
                break;
            case "image":
                component =
                    <Field
                        name={this.props.item.name}
                        label={
                            this.props.item.label
                                ? trans("db." + this.props.item.label)
                                : trans("db." + this.props.item.name)
                        }
                        component={ImageUploader}
                        {...this.props.item}
                    />;
                break;
            default:
                component = "Invalid Field Type: " + this.props.item.type;
                break;
        }
        return (
            <FormControl>
                {component}
            </FormControl>
        )
    }
}

export default FormFieldLoader;