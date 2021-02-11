import React from "react";
import { Link } from "react-router-dom";
import Item from "./Item";

export default props => {
    let { onRowDelete } = props;
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    {
                        props.columns.map(col => (
                            <th>{col.title}</th>
                        ))
                    }
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.items.map(item => (
                        <Item onRowDelete={onRowDelete} columns={props.columns} item={item}/>
                    ))
                }

            </tbody>
        </table>
    )
}