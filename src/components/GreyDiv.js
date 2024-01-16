import React from "react"; 
import "./GreyDiv.css";

const GreyDiv  = ({content, className}) => {
    return (
      <div className={`GreyDiv ${className}`}>
        {content}
      </div>
    );
}

export default GreyDiv; 