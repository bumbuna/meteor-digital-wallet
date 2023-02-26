import React, { memo } from "react";
import { ContactsCollection } from "../api/Contact";
import { useFind, useSubscribe } from 'meteor/react-meteor-data'
import { Image, ListGroup, Ratio, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FileZip, PencilSquare, Trash } from "react-bootstrap-icons";
import { ContactFormModal } from "./ContactFormModal";

const ContactItemActionButton = ({ contact, tooltipText = '', onClickAction, color = '', icon }) => {
    return (
        <OverlayTrigger
            key={'top'}
            placement={'top'}
            overlay={
                <Tooltip id={contact._id}>
                    {tooltipText}
                </Tooltip>
            }>
            <Button onClick={() => onClickAction({ contact })} variant={'outline-light'} as={'div'} className={`${color} border-0 p-0 my-auto mx-2 fs-4`}>
                {icon}
            </Button>
        </OverlayTrigger>
    )
}


export default ContactList = (props) => {
    const isLoading = useSubscribe('allcontacts');
    let contacts = useFind(() => {
        return ContactsCollection.find({}, { sort: { addedOn: -1 } })
    })

    function deleteContact({ contact }) {
        Meteor.call('contacts.remove', ({ id: contact._id }), (errorResponse) => {
            if (errorResponse) {
                alert(errorResponse.error)
            }
        })
    }
    if (isLoading()) {
        return <p>Loading your Contact List...</p>
    }


    const ContactItem = memo(({ contact }) => {
        return <ListGroup.Item key={contact.email}>
            {
                <div className={'d-flex'}>
                    <div style={{
                        width: '50px',
                    }}>
                        <Ratio aspectRatio={'1x1'}>
                            <Image src={contact.profileImageUrl}
                                roundedCircle={true} thumbnail={true}
                                height={'auto'} />
                        </Ratio>
                    </div>
                    <div>
                        <div className={'d-flex flex-column ps-2'}>
                            <span style={{
                                fontSize: '.9em',
                                fontWeight: 'bolder'
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
                    <div className={'d-flex flex-fill justify-content-end'}>
                        <ContactItemActionButton tooltipText="edit"
                            onClickAction={deleteContact}
                            icon={<PencilSquare />}
                            color="text-primary"
                            contact={contact} />
                        <ContactItemActionButton tooltipText="archive"
                            onClickAction={deleteContact}
                            icon={<FileZip />}
                            color="text-success"
                            contact={contact} />
                        <ContactItemActionButton tooltipText="remove"
                            onClickAction={deleteContact}
                            icon={<Trash />}
                            color="text-danger"
                            contact={contact} />

                        {/* <Button onClick={() => deleteContact({ contact })} variant={'outline-light'} as={'div'} className={'text-success border-0 p-0 my-auto mx-2 fs-4'}>
                            <FileZip onClick={() => archiveContact({ contact })} />
                        </Button>
                        <Button onClick={() => deleteContact({ contact })} variant={'outline-light'} as={'div'} className={'text-danger border-0 p-0 my-auto mx-2 fs-4'}>
                            <Trash />
                        </Button> */}
                    </div>
                </div>

            }
        </ListGroup.Item>
    })

    return (
        <>
            <div className="d-flex justify-content-between">
                <span className={'text-start fw-bolder text-muted mt-auto'}>CONTACT LIST</span>
                <ContactFormModal />
            </div>
            <hr />
            {
                contacts.length === 0 ? <p className={'text-center text-muted'}>Contact list is empty</p> :

                    <ListGroup className={'list-group-flush'}>
                        {
                            contacts.map(contact => <ContactItem contact={contact} key={contact._id} />)
                        }
                    </ListGroup>
            }
        </>
    )
}