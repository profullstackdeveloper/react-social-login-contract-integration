import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const WarningImage = styled.img`
    width: 200px;
    height: 200px;
`
const ChooseChain = styled.span`
    color: purple;
    cursor: pointer;
`
export default function Warning({ isOpen, currentChain }) {
    const changeChain = async () => {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{
                chainId: '0x4'
            }]
        })
    }
    return (
        isOpen ? <Container>
            <WarningImage src="/assets/images/logo/warning.png"></WarningImage>
            <div>
                Current chain is {currentChain}.
            </div>
            <div>
                Please choose <ChooseChain onClick={() => changeChain()}><u>Rinkeby</u></ChooseChain>.
            </div>
        </Container>
            : ''
    )
}