import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import EditContactForm from "./EditContactForm";

export const EditContactFormModal = ({ contact, show, closeModal }) => {
    return (
        <>
            <Modal show={show} onHide={() => closeModal()}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Contact</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditContactForm closeModal={closeModal} contact={contact} />
                </Modal.Body>
            </Modal>
        </>
    )
}