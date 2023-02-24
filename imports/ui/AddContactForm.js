import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import Form from "react-bootstrap/Form";
import { Button, Row, Col, Alert } from "react-bootstrap";


const ContactFormGroup = ({ placeholder, updateValue, type, value, label }) => {
    return (
        <Form.Group>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                value={value}
                placeholder={placeholder}
                onChange={(e) => updateValue(e.target.value)}
                type={type} />
        </Form.Group>)
}

const ContactFormAlert = ({ message, variant }) => {
    return (
        <Alert show={message != ''} variant={variant}>
            {message}
        </Alert>
    )
}


export default AddContactForm = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [profileImageUrl, setProfileImageUrl] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const alertTimeoutInMs = 3000

    const saveNewContact = () => {
        Meteor.call('contacts.insert', { name, email, profileImageUrl }, (errorResponse) => {
            if (errorResponse) {
                setErrorMessage(errorResponse.error)
                setTimeout(() => setErrorMessage(''), alertTimeoutInMs)
            } else {
                clearFormFields()
                setSuccessMessage('Contact has been added')
                setTimeout(() => setSuccessMessage(''), alertTimeoutInMs)
            }
        })

    }

    const clearFormFields = () => {
        setName('')
        setEmail('')
        setProfileImageUrl('')
    }

    return (
        <Form onSubmit={(e) => {
            e.preventDefault()
            saveNewContact()
        }}>
            {ContactFormAlert({ message: errorMessage || successMessage, variant: errorMessage ? 'danger' : 'success' })}
            <Row md={3} sm={1} xs={1}>
                <Col>
                    <ContactFormGroup key='name' type={'text'} value={name} updateValue={setName} placeholder={'John Doe'} label={'full name:'} />
                </Col>
                <Col>
                    <ContactFormGroup key='email' type={'email'} value={email} updateValue={setEmail} placeholder={'yourname@example.com'} label={'email address:'} />
                </Col>
                <Col>
                    <ContactFormGroup key='profileimage' type={'text'} value={profileImageUrl} updateValue={setProfileImageUrl} placeholder={'https://mysite.com/logo.png'} label={'image url:'} />
                </Col>

            </Row>
            <div className={'d-flex justify-content-end pt-2'}>
                <Button type='submit'>Save Contact</Button>
            </div>

        </Form>
    )
}