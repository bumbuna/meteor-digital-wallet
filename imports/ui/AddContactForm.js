import React, {useState} from "react";
import {ContactsCollection} from "../api/Contact";
import Form from "react-bootstrap/Form";
import {Container, Button, Row, Col} from "react-bootstrap";


export default AddContactForm = (props) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [profileImageUrl, setProfileImageUrl] = useState('')

    const saveNewContact = () => {
        ContactsCollection.insert({
            name: name,
            email: email,
            profileImageUrl: profileImageUrl,
            addedOn: (new Date()).toUTCString()
        })
        setName('')
        setEmail('')
        setProfileImageUrl((''))
    }
    return (
        <Form onSubmit={(e) => {
            e.preventDefault()
            saveNewContact()
        }}>
            <Row md={3} sm={1} xs={1}>
                <Col>
                    <Form.Group>
                        <Form.Label>Full Name: </Form.Label>
                        <Form.Control
                            value={name}
                            placeholder={'Contact Name'}
                            required={true}
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
                        required={true}
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
                            required={true}
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