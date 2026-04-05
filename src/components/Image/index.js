import React from "react";

const Image = props => {
    return <img style={props.style} src={props.src} alt={props.alt || ""} />
}

export default Image;
