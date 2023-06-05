import React, { useEffect, useState } from 'react';
import { LoginForm } from './components/LoginForm';
import { Container, Button, Stack } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { SignupForm } from './components/SignupForm';
import { ResetPasswordForm } from './components/ResetPasswordForm';
import { initializeFirebaseApp } from './my-firebase-app';
import { RequestResetPasswordForm } from './components/RequestResetPasswordForm';
import { Home } from './components/Home';
import { getAuth } from 'firebase/auth';

initializeFirebaseApp()
const auth = getAuth()

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser !== null)
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

    
    auth.onAuthStateChanged(user => {
        console.log({ user })
        const newLoginStatus = user !== null 
        if(newLoginStatus !== isLoggedIn) {
            // only update the state when it changes, otherwises you may end up in an infinite loop
            setIsLoggedIn(newLoginStatus)
        }
    })

    if(isLoggedIn) {
        return (
            <Home />
        )
    }

    return (
        <div className="App">
            <Container>
                <LoginForm show={showLoginForm} setShow={setShowLoginForm} />
                <SignupForm show={showSignupForm} setShow={setShowSignupForm} />
                <ResetPasswordForm show={showResetPasswordForm} setShow={setShowResetPasswordForm} />
                <RequestResetPasswordForm show={showRequestResetPasswordForm} setShow={setShowRequestResetPasswordForm} />


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
