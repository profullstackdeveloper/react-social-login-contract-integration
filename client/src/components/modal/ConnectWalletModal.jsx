import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Web3Context } from '../../context/web3Context';
import RoundButton from '../buttons/RoundButton';
import Web3 from 'web3';

const ContainerAnimation = keyframes`
    from {
        opacity: 0;
        backdrop-filter: blur(0px);
    }
    to {
        opacity: 1;
        backdrop-filter: blur(15px);
    }
`

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.7);
    position: absolute;
    top: 0px;
    left: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    animation: ${ContainerAnimation} 1s ease 1;
    animation-fill-mode: forwards;
`
const ModalContainer = styled.div`
    width: 400px;
    height: 200px;
    background-color: white;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 20px;
`
const LogoImage = styled.img`
    width: 260;
    height: 150px;
`
const WarningMessage = styled.div`
    font-size: 20px;
    font-weight: 600;
`

export default function ConnectWalletModal ({isOpen=true, onClose, walletStatus=false}) {
    const {setCurrentAccount, provider} = React.useContext(Web3Context);
    const connectWallet = async () => {
        const web3 = new Web3(provider);
        const accounts = await web3.eth.requestAccounts();
        console.log(accounts);
        localStorage.setItem('account', accounts[0]);
        setCurrentAccount(accounts[0]);
        onClose(false);
    }
    return (
        isOpen ? <Container>
            <ModalContainer>
                <LogoImage src='/assets/images/logo/metamask.png'></LogoImage>
                {
                    walletStatus 
                    ? <RoundButton content={'Connect Metamask'} handleClick={connectWallet}></RoundButton> 
                    : <WarningMessage>Please <a href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en'>Install MetaMask</a></WarningMessage>
                }
            </ModalContainer>
        </Container>
        : ''
    )
}