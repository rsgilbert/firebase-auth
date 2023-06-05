import React from "react";
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import { Form } from "react-bootstrap";



export function UploadFile() {
    const storage = getStorage() 

    const handleFileChange = event => {
        console.log(event.currentTarget.files)
        if (event.currentTarget.files) {
            const f = event.currentTarget.files[0]
            performUploadToFirebase(f)
        }
    }

    /**
     * @param {File} file 
     */
    async function performUploadToFirebase(file) {
        console.log({ file })
        const imageRef = ref(storage, `images/${file.name}`)
        const result = await uploadBytes(imageRef, file)
        console.log('finished uploading file', result )
    }

    return (
        <div>
            <h2>Upload Files</h2>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>File</Form.Label>
                    <Form.Control type="file" name="File" onChange={handleFileChange} />
                </Form.Group>
            </Form>
        </div>
    )
}