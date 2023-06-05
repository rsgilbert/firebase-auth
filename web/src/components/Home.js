import React from "react";
import { getAuth,  } from 'firebase/auth'
import { Button } from "react-bootstrap";
import { initializeFirebaseApp } from "../my-firebase-app";


initializeFirebaseApp()
const auth = getAuth()
console.log(auth)
console.log({ currentUser: auth.currentUser })

const handleShowUser = () => {
    console.log({ usr: auth.currentUser })
}

const handleSignout = () => {
    auth.signOut()
}

auth.onAuthStateChanged(user =>{ 
    if(user === null) {
        console.log('No logged in user')
    }
    console.log({ userIs: user })
})


export function Home() {
       return (
        <div>
            <h1>Home</h1>

            <Button onClick={handleShowUser}>
                SHOW USER
            </Button>

            <Button onClick={handleSignout}>
                SIGN OUT
            </Button>
        </div>
    )
}