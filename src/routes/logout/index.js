import React from "react";

class Logout extends React.Component {
    componentDidMount(){
        localStorage.setItem("solyd_floors:token","")
        localStorage.setItem("user:role",false)
        window.location.href = "/";
    }
    render(){
        return "Logging out..."
    }
}

export default Logout;