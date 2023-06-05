import React from "react";
import { getAuth,  } from 'firebase/auth'
import { Button } from "react-bootstrap";
import { initializeFirebaseApp } from "../my-firebase-app";
import { UploadFile } from "./UploadFile";


initializeFirebaseApp()
const auth = getAuth()
// console.log({ currentUser: auth.currentUser })

const handleShowUser = () => {
    console.log({ usr: auth.currentUser })
}

const handleSignout = () => {
    auth.signOut()
}



export function Home() {
       return (
        <div>
            <h1>Home</h1>

            <UploadFile />

            <div style={{marginTop: 100 }} />
            <Button onClick={handleShowUser} style={{marginRight: 10 }}>
                SHOW USER
            </Button>

            <Button onClick={handleSignout}>
                SIGN OUT
            </Button>
        </div>
    )
}