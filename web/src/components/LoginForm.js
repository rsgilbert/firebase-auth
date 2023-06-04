import React, { useState } from 'react';
import { Button, Form, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faSignIn } from "@fortawesome/free-solid-svg-icons";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { initializeFirebaseApp } from '../my-firebase-app'


/**
 * @param {*} props
 * @returns 
 */
export function LoginForm(props) {
    const show = props.show;
    const setShow = props.setShow;
    const handleClose = () => setShow(false)
    const [form, setForm] = useState({
        Email: '',
        Password: ''
    })

 
    async function handleSubmit() {
        console.log('submitting form', form)
        const firebaseApp = initializeFirebaseApp()
        const auth = getAuth()
        const userCredential = await createUserWithEmailAndPassword(auth, form.Email, form.Password)
        console.log({ userCredential })
        sendEmailVerification(userCredential.user)
    }

    const handleFormChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control name="Email" onChange={handleFormChange} value={form.Email} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="Password" onChange={handleFormChange} value={form.Password} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={handleSubmit}>
                    <FontAwesomeIcon icon={faSignIn} />
                    &nbsp;
                    Login
                </Button >
            </Modal.Footer>
        </Modal>
    )
}

