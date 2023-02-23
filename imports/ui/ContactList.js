import React from "react";
import {ContactsCollection} from "../api/Contact";
import {useTracker} from 'meteor/react-meteor-data'

export default ContactList = (props) => {

    let contacts = useTracker(() => {
        return ContactsCollection.find().fetch()
    })
    return(
        <>
            <h1>Your Contact List</h1>
            <ul style={{
                fontWeight: 'bold',
                fontSize: '1.2em'
            }}>
                {
                    contacts.map(contact => {
                        return <li key={contact.email}>
                            {contact.name +', '+contact.email+', '+contact.profileImageUrl}
                        </li>
                    })
                }
            </ul>
        </>
    )
}