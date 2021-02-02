import { TableHead, TableRow, TableCell } from "@material-ui/core";
import React from "react";
import { IDataTableHeadProps } from "../../../../../@types/client/admin/components";
import { trans } from "../../../../common/resources/lang/translate";

class DataTableHead extends React.Component<IDataTableHeadProps>{
    render() {
        return (
            <TableHead>
                <TableRow>
                    {(!this.props.fetching && this.props.items.length > 0) && (/** only show the fields after fetching data from server completed */
                        <>
                            {this.props.fields.map((field: string) => {
                                return Object.keys(this.props.items[0]).includes(field) ? (  /** check the header field is really exists on data, if it is not, dont render this field */
                                    <TableCell key={field} align="center">
                                        <strong>{trans("db." + field) != "" ? trans("db." + field) : field.toUpperCase()}</strong>
                                    </TableCell>
                                ) : (null)
                            })}
                            <TableCell align="center" size="small" padding="none">
                                <strong>{trans("resource.actions")}</strong>
                            </TableCell>
                        </>
                    )}
                </TableRow>
            </TableHead>

        );
    }
}

export default DataTableHead;