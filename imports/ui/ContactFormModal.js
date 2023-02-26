import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import AddContactForm from "./AddContactForm";
import { PersonAdd } from "react-bootstrap-icons";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export const ContactFormModal = (props) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new Contact</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddContactForm />
                </Modal.Body>
            </Modal>

            <OverlayTrigger
                key={'top'}
                placement={'top'}
                overlay={
                    <Tooltip id={'add-new-contact'}>
                        {'new'}
                    </Tooltip>
                }>
                <Button className="p-0" variant="outline-transparent" onClick={() => setShowModal(true)}>
                    <PersonAdd className="fs-4 text-primary" />
                </Button>
            </OverlayTrigger>

        </>
    )
}