import React, { useState } from 'react';
import { LoginForm } from './components/LoginForm';
import { Container, Button, Stack } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { SignupForm } from './components/SignupForm';

function App() {
    const [showLoginForm, setShowLoginForm] = useState(false)
    const [showSignupForm, setShowSignupForm] = useState(false)
    async function handleBeginLogin() {
        setShowLoginForm(true)
    }
    async function handleBeginSignup() {
        setShowSignupForm(true)
    }

    return (
        <div className="App">
            <Container>
                <LoginForm show={showLoginForm} setShow={setShowLoginForm} />
                <SignupForm show={showSignupForm} setShow={setShowSignupForm} />


                <div>Hello</div>

                <Stack gap={1} direction='horizontal'>
                    <Button onClick={handleBeginSignup}>Signup</Button>
                    <Button onClick={handleBeginLogin}>Login</Button>
                </Stack>

            </Container>

        </div>
    );
}

export default App;
