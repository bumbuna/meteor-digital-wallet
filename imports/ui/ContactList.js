import React from "react";
import {ContactsCollection} from "../api/Contact";
import {useTracker} from 'meteor/react-meteor-data'
import {Col, Container, Image, ListGroup, Ratio, Row} from "react-bootstrap";

export default ContactList = (props) => {

    let contacts = useTracker(() => {
        return ContactsCollection.find({}, {sort: {addedOn: -1}}).fetch()
    })
    return(
        <>
            <span style={{
                fontSize: '.8em',
            }} className={'text-start fw-bold'}>CONTACT LIST</span>
            <hr/>
            {
                contacts.length === 0 ? <p className={'text-center text-muted'}>Contact list is empty</p> :

                    <ListGroup className={'list-group-flush'}>
                        {
                            contacts.map(contact => {
                                return <ListGroup.Item key={contact.email}>
                                    {
                                        <div className={'d-flex'}>
                                            <div style={{
                                                width: '50px',
                                            }}>
                                                <Ratio aspectRatio={'1x1'}>
                                                    <Image src={contact.profileImageUrl}
                                                           roundedCircle={true} rounded={true} thumbnail={true}
                                                           height={'auto'}/>
                                                </Ratio>
                                            </div>
                                            <div>
                                                <div className={'d-flex flex-column ps-2'}>
                                            <span style={{
                                                fontSize:'.9em',
                                                fontWeight:'bolder'
                                            }}>{
                                                contact.name
                                            }</span>
                                                    <span className={'text-muted'} style={{
                                                        fontSize: '.7em'
                                                    }}>
                                                {
                                                    contact.email
                                                }
                                            </span>
                                                </div>

                                            </div>
                                        </div>

                                    }
                                </ListGroup.Item>
                            })
                        }
                    </ListGroup>
            }
            {/*<ul style={{*/}
            {/*    fontWeight: 'bold',*/}
            {/*    fontSize: '1.2em'*/}
            {/*}}>*/}
            {/*    {*/}
            {/*        contacts.map(contact => {*/}
            {/*            return <li key={contact.email}>*/}
            {/*                {contact.name +', '+contact.email+', '+contact.profileImageUrl}*/}
            {/*            </li>*/}
            {/*        })*/}
            {/*    }*/}
            {/*</ul>*/}
        </>
    )
}