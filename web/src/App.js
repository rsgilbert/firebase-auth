import React, { useState } from 'react';
import { LoginForm } from './components/LoginForm';
import { Container, Button, Stack } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { SignupForm } from './components/SignupForm';
import { ResetPasswordForm } from './components/ResetPasswordForm';
import { initializeFirebaseApp } from './my-firebase-app';
import { RequestResetPasswordForm } from './components/RequestResetPasswordForm';

function App() {
    initializeFirebaseApp()
    const [showLoginForm, setShowLoginForm] = useState(false)
    const [showSignupForm, setShowSignupForm] = useState(false)    
    const [showRequestResetPasswordForm, setShowRequestResetPasswordForm] = useState(false)
    const [showResetPasswordForm, setShowResetPasswordForm] = useState(false)
    async function handleBeginLogin() {
        setShowLoginForm(true)
    }
    async function handleBeginSignup() {
        setShowSignupForm(true)
    }
    async function handleBeginResetPassword() {
        setShowResetPasswordForm(true)
    }
    async function handleBeginRequestResetPassword() {
        setShowRequestResetPasswordForm(true)
    }

    return (
        <div className="App">
            <Container>
                <LoginForm show={showLoginForm} setShow={setShowLoginForm} />
                <SignupForm show={showSignupForm} setShow={setShowSignupForm} />
                <ResetPasswordForm show={showResetPasswordForm} setShow={setShowResetPasswordForm} />
                <RequestResetPasswordForm show={showRequestResetPasswordForm} setShow={setShowRequestResetPasswordForm} />
                <div>Hello</div>

                <Stack gap={1} direction='horizontal'>
                    <Button onClick={handleBeginSignup}>Signup</Button>
                    <Button onClick={handleBeginLogin}>Login</Button>
                    <Button onClick={handleBeginRequestResetPassword}>Request to Reset Password</Button>
                    <Button onClick={handleBeginResetPassword}>Reset Password</Button>
                </Stack>

            </Container>

        </div>
    );
}

export default App;
