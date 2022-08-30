import React, {useState} from 'react';
import PageWrapper from "../../components/StylingElements/PageWrapper/PageWrapper";
import Background from "../../components/StylingElements/Background/Background";
import Button from "../../components/StylingElements/Button/Button";
import {useHistory} from "react-router-dom";
import axios from "axios";
import {useForm} from "react-hook-form";

const NoMatch = () => {

    const history = useHistory();

    const {handleSubmit} = useForm();

    const [file, setFile] = useState({});

    async function handleUpload() {
        let formdata = new FormData();
        formdata.append('file', file);

        try {
            await axios.post("http://localhost:8080/students/2/upload",
                formdata,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }}
            )
        } catch (e) {
            console.error(`${e.message}`)
        }
    }


    return (
        <PageWrapper>
            <Background>
                <h3>Deze pagina bestaat niet, keer terug naar de vorige pagina.</h3>
                <Button color="orange" text="Terug" onClick={() => history.goBack()} />
            </Background>

            <form encType="multipart/form-data" onSubmit={handleSubmit(handleUpload)}>
                <div>
                    <label>
                    <input
                        type="file"
                        accept="image/jpeg, image/png"
                        onChange={(e) => setFile(e.target.files[0])}/>
                        Select file
                    </label>
                    <br/>
                    <button type="submit">Upload</button>
                </div>
            </form>
        </PageWrapper>
    );
};

export default NoMatch;