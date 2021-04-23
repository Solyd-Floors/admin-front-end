import React from "react";
import Gallery from "./Gallery/index";

class General extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        return (
            <div>
                <h1>General</h1><br/>
                <div>
                    <Gallery/>
                </div>
            </div>
        )
    }
}

export default General;