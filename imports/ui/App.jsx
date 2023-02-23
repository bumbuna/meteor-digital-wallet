import React from 'react';
import AddContactForm from "./AddContactForm";
import ContactList from "./ContactList";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Col, Row, Container, Navbar} from "react-bootstrap";
import {Wallet} from "react-bootstrap-icons";

export const App = () => (
    <>
    <Navbar style={{
        height:'80px',
        marginBottom: '2px'
    }} sticky={'top'} bg={'primary'}>
<Container className={'fs-1 text-light d-flex'}>
    <div>
        <Wallet className={'fw-bolder'}/>
        <span className={'fs-4 ps-3 fw-bolder'}>Bumbuna's Meteor Wallet</span>
    </div>
</Container>
    </Navbar>
<Container className={'pt-3'}>
      <Row cols={2}>
          <Col xs={12}>
              <AddContactForm/>
          </Col>
          <Col>
              <ContactList/>
          </Col>
      </Row>

  </Container>
        </>
);
