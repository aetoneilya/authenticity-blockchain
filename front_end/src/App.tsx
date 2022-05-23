import React from 'react';
import { DAppProvider, Mainnet, Kovan, Rinkeby } from '@usedapp/core';
import { Header } from "./components/Header"
import { Container, Typography, Card } from "@material-ui/core"
import { Main } from "./components/Main"

const config = {
    readOnlyChainId: Mainnet.chainId,
    readOnlyUrls: {
        [Mainnet.chainId]: 'https://mainnet.infura.io/v3/05d6520e7ab34b0aa4446e9004dcbe48',
        [Kovan.chainId]: 'https://kovan.infura.io/v3/05d6520e7ab34b0aa4446e9004dcbe48',
        [Rinkeby.chainId]: 'https://rinkeby.infura.io/v3/05d6520e7ab34b0aa4446e9004dcbe48',
    },
}

function App() {
    return (
        <DAppProvider config={config}>
            <Header />
            <Container maxWidth="md">
                <Typography variant="h1">Authenticity Check</Typography>
                <Main />
            </Container>
        </DAppProvider>
    );
}

export default App;
