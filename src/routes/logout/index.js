import React from "react";

class Logout extends React.Component {
    componentDidMount(){
        localStorage.setItem("auth:token","")
        localStorage.setItem("user:role",false)
        window.location.href = "/";
    }
    render(){
        return "Logging out..."
    }
}

export default Logout;