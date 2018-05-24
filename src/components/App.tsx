import React, { CSSProperties } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Container } from 'reactstrap';
import Footer from './Footer';
import Routes from './Routes';


const styles: CSSProperties = {
    minWidth: "800px",
    padding: "0 0 100px",
    position: "relative"
};
const titleStyles: CSSProperties = {
    fontFamily: "Roboto, sans-serif",
    fontSize: "50px",
    textAlign: "center"
};

const App = () => (
    <BrowserRouter>
        <Container style={ styles }>
            <div className="well">
                <div style={ titleStyles }>Checkers</div>
                <Routes />
            </div>
            <Footer />
        </Container>
    </BrowserRouter>
);
export default App;