import { Grid, TableCell, TableFooter, TableRow } from "@material-ui/core";
import React from "react";
import { trans } from "../../../../common/resources/lang/translate";
import { IDataTableFooterProps } from './../../../../../@types/client/admin/components.d';

class DataTableFooter extends React.Component<IDataTableFooterProps>{
    render() {
        return (
            <TableFooter>
                <TableRow>
                    <TableCell>
                        <Grid container direction="row">
                            <Grid item md={4}>
                                <p>{(this.props.dataCount && this.props.dataCount > 0) ? trans('resource.countRecordsFound', { count: this.props.dataCount.toString() }) : trans('resource.dataNotFound')}</p>
                            </Grid>
                            <Grid item md={7}>
                                {/** TODO add the pagination support */}
                            </Grid>
                        </Grid>
                    </TableCell>
                </TableRow>
            </TableFooter>
        );
    }
}

export default DataTableFooter;