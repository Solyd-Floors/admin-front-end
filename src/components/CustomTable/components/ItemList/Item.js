import React from "react";
import { Link } from "react-router-dom";

class Item extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false
        }
    }
    deleteItem = async () => {
        this.setState({
            loading: true
        })
        try {
            await this.props.onRowDelete(this.props.item)
        } catch(err){
            console.log(err)
        }
        // this.setState({
        //     loading: false
        // })
    }
    render(){
        let { onRowDelete, item } = this.props;
        if (this.state.loading) return (
            <tr>
                <td>
                    <img src="https://i.gifer.com/ZZ5H.gif"/> 
                    Deleting..
                </td>
            </tr>
        )
        return (
            <tr>
                {
                    this.props.columns.map(col => (
                        <td className="py-1">{item[col.field]}</td>
                    ))
                }
                <td>
                    <Link to={`?id=${item.id}`}>
                        <button style={{
                            marginLeft: 3
                        }} className="btn btn-primary">
                            View more
                        </button> 
                    </Link>
                    {
                        onRowDelete && 
                        <button onClick={this.deleteItem} style={{
                            marginLeft: 3
                        }} className="btn btn-primary">
                            Delete
                        </button>     
                    }
                </td>
            </tr>
        )
    }
}

export default Item;