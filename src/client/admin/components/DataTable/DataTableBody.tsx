import { TableRow, TableCell, TableBody } from "@material-ui/core";
import React from "react";
import { IDataTableBodyProps } from "../../../../../@types/client/admin/components";
import { trans } from "../../../../common/resources/lang/translate";
import ActionMenu from "../form/ActionMenu";

class DataTableBody extends React.Component<IDataTableBodyProps> {
    render() {
        return (
            <TableBody>
                {this.props.items.length > 0
                    ? this.props.items.map((item, key) => (
                        <TableRow
                            key={key}
                            className={key % 2 === 0 ? this.props.themeClass : null} // better coloring
                        >
                            <>
                                {this.props.fields.map((field, index) => {
                                    return (
                                        <TableCell key={index} align="center">
                                            {item[field] != null &&
                                                !Array.isArray(item[field]) &&
                                                typeof item[field] !== "object"
                                                ? item[field]
                                                : ""}
                                        </TableCell>
                                    );
                                })}
                                <TableCell align="center" size="small" padding="none">
                                    <ActionMenu
                                        url={this.props.resourceURL + "/" + item._id}
                                        actions={this.props.actions}
                                        actionResult={this.props.actionResult}
                                    />
                                </TableCell>
                            </>
                        </TableRow>

                    ))
                    : (
                        <TableRow>
                            <TableCell>
                                <strong>{trans('resource.dataNotFound')}</strong>
                            </TableCell>
                        </TableRow>
                    )}
            </TableBody>

        )
    }
}

export default DataTableBody;