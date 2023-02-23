import React, {useState} from "react";
import {ContactsCollection} from "../api/Contact";

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
        <form>
            <h2>Add a new contact</h2>
            <label>Full Name: </label>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type='text'/>
            <br/>
            <label>Email Address: </label>
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type='text'/>
            <br/>
            <label>Profile Image Url: </label>
            <input
                value={profileImageUrl}
                onChange={(e) => setProfileImageUrl(e.target.value)}
                type='text'/>
            <br/>
            <button type='button' onClick={saveNewContact}>Save New Contact</button>
        </form>
    )
}