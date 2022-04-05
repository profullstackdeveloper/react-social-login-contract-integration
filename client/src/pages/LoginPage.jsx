import React from 'react';
import styled from 'styled-components';
import ConnectWalletModal from '../components/modal/ConnectWalletModal';
import LoginForm from '../components/pages/loginform/LoginForm';
import { Web3Context } from '../context/web3Context';

const Container = styled.div`
    width: 100vw;
    height: calc(100vh - 200px);
    background-image: url('/assets/images/backgrounds/login_background.webp');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`
export default function LoginPage() {
    // console.log('login page props', props)
    const {walletStatus, displayModal, setDisplayModal} = React.useContext(Web3Context);
    return (
        <Container>
            <LoginForm></LoginForm>
            <ConnectWalletModal walletStatus={walletStatus} isOpen={displayModal} onClose={setDisplayModal}></ConnectWalletModal>
        </Container>
    )
}