import React from "react";
import {Alert} from "react-bootstrap";

export default ContactFormAlert = ({message, variant, show}) => {
    return (
        <Alert show={message} variant={variant}>
            {message}
        </Alert>
    )
}