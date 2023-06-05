import React, { useState } from 'react';
import { Alert, Button, Form, Modal, ProgressBar, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMailForward, faSignIn } from "@fortawesome/free-solid-svg-icons";
import { getAuth, signInWithEmailAndPassword, verifyPasswordResetCode, sendPasswordResetEmail, confirmPasswordReset } from 'firebase/auth'
import { initializeFirebaseApp } from '../my-firebase-app'


/**
 * @param {*} props
 * @returns 
 */
export function ResetPasswordForm(props) {
    const show = props.show;
    const setShow = props.setShow;
    const [resetInProgress, setresetInProgress] = useState(false)
    const handleClose = () => setShow(false)
    const [form, setForm] = useState({
        Email: '',
        Password: ''
    })
    const [errorMessage, setErrorMessage] = useState('')


    async function handleSubmit() {
        try {
           // setresetInProgress(true)
            setErrorMessage('')
            console.log('submitting form', form)
            if (form.Password?.length < 6) {
                throw new Error('Short password')
            }

            const auth = getAuth()
            const searchParams = new URLSearchParams(window.location.search)
            const oobCode = searchParams.get('oobCode')
            if(!oobCode) {
                throw new Error('No oobCode in url. oobCode is required to reset password')
            }
            await confirmPasswordReset(auth, oobCode, form.Password)
            console.log('password has been reset')
        }
        catch (e) {
            console.log(e)
            setErrorMessage(e.message)
        }
        finally {
            setTimeout(() => {
                setresetInProgress(false)
            }, 200)
        }
    }

    const handleFormChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Reset Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert variant="danger" hidden={!errorMessage}>Error: {errorMessage}</Alert>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="Password" onChange={handleFormChange} value={form.Password} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                {resetInProgress &&
                    <Button variant="success" onClick={handleSubmit} disabled>
                        <Spinner size='sm' />
                        &nbsp;
                        Resetting password
                    </Button >
                }
                {!resetInProgress &&
                    <Button variant="success" onClick={handleSubmit}>
                        <FontAwesomeIcon icon={faMailForward} />
                        &nbsp;
                        Reset Password
                    </Button >
                }
            </Modal.Footer>
        </Modal>
    )
}

