import { Button, createStyles, Grid, StyledComponentProps, withStyles } from "@material-ui/core";
import React from "react";
import { reduxForm } from "redux-form";
import { store } from '..';
import { IFilterProps, IFilterState } from "../../../../@types/client/admin/components";
import { IFilter, IFormPostRequestFields } from "../../../../@types/client/admin/form";
import { ITheme } from "../../../../@types/client/admin/theme";
import { trans } from "../../../common/resources/lang/translate";
import { setFilter } from "../store/filter/actions";
import CustomForm from "./form/CustomForm";

const styles = (theme: ITheme) => createStyles({
    resetButton: {
        backgroundColor: theme.palette.third.main,
        color: theme.palette.third.contrastText,
    },
});


class FilterFormFooter extends React.Component<StyledComponentProps>{
    render() {
        const submitStyle: React.CSSProperties = {
            marginLeft: "auto",
            marginTop: "10px",
        };
        return (
            <>
                <Grid >
                    <Button type="button" style={submitStyle} variant="contained" className={this.props.classes.resetButton}
                        onClick={(): void => {
                            store.dispatch(setFilter({ fields: [] }));
                        }}
                    >
                        {/* TODO */}
                    Filtreyi Temizle
                </Button>

                </Grid>
                <Grid>
                    <Button type="submit" style={submitStyle} variant="contained" color="primary">
                        {trans("resource.filter")}
                    </Button>
                </Grid>
            </>
        );
    }
}

const HOCFilterFormFooter = withStyles(styles)(FilterFormFooter);


const filterForm = (props) => {
    const { handleSubmit, items } = props;
    return <CustomForm footerComponent={<HOCFilterFormFooter />} handleSubmit={handleSubmit} items={items} />;
};

let FilterFormRedux: any = reduxForm({
    form: "filterForm", // a unique name for the form,
})(filterForm);


class Filter extends React.Component<IFilterProps, IFilterState>{
    submit = (requestFields: IFormPostRequestFields) => {
        let filters: Array<IFilter> = [];
        let count: number = 0;
        for (const key in requestFields) {
            filters[count] = {
                name: key,
                value: requestFields[key]
            }
            count++;
        }
        store.dispatch(setFilter({ fields: filters }));
    };

    render() {
        return (
            <>
                {/* add "like" operator support */}
                <FilterFormRedux onSubmit={this.submit} items={this.props.items} />
            </>
        );
    }
}

export default Filter;