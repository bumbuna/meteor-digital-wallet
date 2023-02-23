import React, {useState} from "react";
import {Meteor} from "meteor/meteor";
import Form from "react-bootstrap/Form";
import {Container, Button, Row, Col, Alert} from "react-bootstrap";
import ContactFormAlert from "./Components/ContactFormAlert";


export default AddContactForm = (props) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [profileImageUrl, setProfileImageUrl] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const saveNewContact = () => {
       Meteor.call('contacts.insert', {name, email, profileImageUrl}, (errorResponse) => {
           if(errorResponse) {
               setError(errorResponse.error)
               setTimeout(() => setError(''), 3000)
           } else {
               setName('')
               setEmail('')
               setProfileImageUrl('')
               setSuccess('Contact has been added')
               setTimeout(() => setSuccess(''), 3000)
           }
       })

    }
    return (
        <Form onSubmit={(e) => {
            e.preventDefault()
            saveNewContact()
        }}>
            {error && ContactFormAlert({message: error, variant: 'danger'})}
            {success && ContactFormAlert({message: success, variant: 'success'})}
            <Row md={3} sm={1} xs={1}>
                <Col>
                    <Form.Group>
                        <Form.Label>Full Name: </Form.Label>
                        <Form.Control
                            value={name}
                            placeholder={'Contact Name'}
                            onChange={(e) => setName(e.target.value)}
                            type='text'/>
                    </Form.Group>
                </Col>
            <Col>
                <Form.Group>
                    <Form.Label>Email Address: </Form.Label>
                    <Form.Control
                        value={email}
                        placeholder={'Email  Address'}
                        onChange={e => setEmail(e.target.value)}
                        type='text'/>
                </Form.Group>
            </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>Profile Image Url: </Form.Label>
                        <Form.Control
                            value={profileImageUrl}
                            placeholder={'Profile image url'}
                            onChange={(e) => setProfileImageUrl(e.target.value)}
                            type='text'/>
                    </Form.Group>
                </Col>

            </Row>
            <div className={'d-flex justify-content-end pt-2'}>
                <Button type='submit'>Save Contact</Button>
            </div>

        </Form>
    )
}