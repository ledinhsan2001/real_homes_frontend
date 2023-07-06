import React from "react";
import "./Button.css";

export const Button = ({ text }) => {
    return (
        <div className="btn">
            <input type="button" name={text} value={text} />
        </div>
    );
};
export default Button;
