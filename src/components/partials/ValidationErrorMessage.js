import React from "react";

function ValidationErrorMessage(props) {

    return (
        <small className="text-danger font-italic">
            {props.errorMessage}
        </small>
    );
}

export default ValidationErrorMessage;