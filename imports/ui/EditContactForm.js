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


export default AddContactForm = ({ contact, closeModal = () => { } }) => {

    const [name, setName] = useState(contact.name)
    const [email, setEmail] = useState(contact.email)
    const [profileImageUrl, setProfileImageUrl] = useState(contact.profileImageUrl)
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const alertTimeoutInMs = 3000

    const saveEditedContact = () => {
        Meteor.call('contacts.update', { _id: contact._id, name, email, profileImageUrl }, (errorResponse) => {
            if (errorResponse) {
                setErrorMessage(errorResponse.error)
                setTimeout(() => setErrorMessage(''), alertTimeoutInMs)
            } else {
                // clearFormFields()
                setSuccessMessage('Contact has been updated')
                setTimeout(() => setSuccessMessage(''), alertTimeoutInMs)
                // closeModal()
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
            saveEditedContact()
        }}>
            {ContactFormAlert({ message: errorMessage || successMessage, variant: errorMessage ? 'danger' : 'success' })}
            <Row className="gy-2" xs={1}>
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
                <Button type='submit'>Edit Contact</Button>
            </div>

        </Form>
    )
}