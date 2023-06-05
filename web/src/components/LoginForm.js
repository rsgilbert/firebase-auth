import React, { useState } from 'react';
import { Alert, Button, Form, Modal, ProgressBar, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { initializeFirebaseApp } from '../my-firebase-app'


/**
 * @param {*} props
 * @returns 
 */
export function LoginForm(props) {
    const show = props.show;
    const setShow = props.setShow;
    const [loginInProgress, setLoginInProgress] = useState(false)
    const handleClose = () => setShow(false)
    const [form, setForm] = useState({
        Email: '',
        Password: ''
    })
    const [errorMessage, setErrorMessage] = useState('')


    async function handleSubmit() {
        try {
           // setLoginInProgress(true)
            setErrorMessage('')
            console.log('submitting form', form)
            if (!form.Email?.includes('@')) {
                setErrorMessage(`Invalid email address ${form.Email}`)
                return
            }
            if (form.Password?.length < 6) {
                setErrorMessage('Short password')
                return;
            }

            const firebaseApp = initializeFirebaseApp()
            const auth = getAuth()
            const userCredential = await signInWithEmailAndPassword(auth, form.Email, form.Password)
            console.log({ userCredential })
        }
        catch (e) {
            console.log(e)
            setErrorMessage(e.message)
        }
        finally {
            setTimeout(() => {
                setLoginInProgress(false)
            }, 200)
        }
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
                <Alert variant="danger" hidden={!errorMessage}>Error: {errorMessage}</Alert>
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
                {loginInProgress &&
                    <Button variant="success" onClick={handleSubmit} disabled>
                        <Spinner size='sm' />
                        &nbsp;
                        Logging in
                    </Button >
                }
                {!loginInProgress &&
                    <Button variant="success" onClick={handleSubmit}>
                        <FontAwesomeIcon icon={faSignIn} />
                        &nbsp;
                        Login
                    </Button >
                }
            </Modal.Footer>
        </Modal>
    )
}

