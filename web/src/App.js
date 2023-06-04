import React, { useState } from 'react';
import { LoginForm } from './components/LoginForm';
import { Container, Button }  from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    const [showLoginForm, setShowLoginForm] = useState(true)
    async function handleBeginLogin() {
        setShowLoginForm(true)
    }

    return (
        <div className="App">
            <Container>
                <LoginForm show={showLoginForm} setShow={setShowLoginForm} />
                <div>Hello</div>
                <Button onClick={handleBeginLogin}>Login</Button>

            </Container>

        </div>
    );
}

export default App;
