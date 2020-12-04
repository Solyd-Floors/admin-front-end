import React from "react";

class Row extends React.Component {

    renderRowCheckCell = (row) => {
        const {isSelected} = this.props;
        return (
            <TableCell padding="checkbox">
                <Checkbox
                    checked={isSelected}
                />
            </TableCell>
        );
    }

    handleClick = (event, row) => {
        const {isSelected, onSelectionChange, selectableEnabled} = this.props;
        if (selectableEnabled) {
            onSelectionChange(row, !isSelected);
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const {selectableEnabled, isSelected, columns, row} = this.props;
        let shouldUpdate = false;
        if (nextProps.selectableEnabled !== selectableEnabled ||
            nextProps.isSelected !== isSelected ||
            nextProps.row !== row
        ) {
            shouldUpdate = true;
        }
        if (nextProps.columns.length !== columns.length) {
            shouldUpdate = true;
        }
        for (let i = 0; i < nextProps.length; ++i) {
            const column1 = nextProps.columns[i];
            const column2 = columns[i];
            if (column1.field !== column2.field) {
                shouldUpdate = true;
                break;
            }
        }
        return shouldUpdate;
    }

    render () {
        const {selectableEnabled, isSelected, columns, row} = this.props;
        console.log(`Row #${row.id} was rendered.`)
        return (
            <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                selected={isSelected}
                aria-checked={isSelected}
                onClick={event => this.handleClick(event, row)}
            >
                {
                    selectableEnabled ? this.renderRowCheckCell(row) : null
                }
                {
                    columns.map(({render, field, align}) => {
                        const value = render ?
                            render(row) :
                            row[field];
                        return (
                            <TableCell key={field} align={align}>
                                {value}
                            </TableCell>
                        );
                    })
                }
            </TableRow>
        );
    }
}

Row.propTypes = {
    selectableEnabled: PropTypes.bool.isRequired,
    isSelected: PropTypes.bool.isRequired,
    columns: PropTypes.array.isRequired,
    row: PropTypes.array.isRequired,
    onSelectionChange: PropTypes.func.isRequired
}
