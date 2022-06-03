import React from 'react';
import PageWrapper from "../../components/StylingElements/PageWrapper/PageWrapper";
import Background from "../../components/StylingElements/Background/Background";
import Button from "../../components/Button/Button";
import {useHistory} from "react-router-dom";

const NotFound = () => {

    const history = useHistory();

    return (
        <PageWrapper>
            <Background>
                <h3>Deze pagina bestaat niet, keer terug naar de vorige pagina.</h3>
                <Button color="orange" text="Terug" onClick={() => history.goBack()} />
            </Background>
        </PageWrapper>
    );
};

export default NotFound;