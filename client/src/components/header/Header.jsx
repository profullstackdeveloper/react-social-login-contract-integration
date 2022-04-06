import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Web3Context } from '../../context/web3Context';
import AccountInput from '../input/AccountInput';

const Container = styled.div`
    width: calc(100vw - 50px);
    height: 60px;
    padding: 20px 25px;
    background-color: purple;
    color: white;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

export default function Header() {
    const {currentAccount, setCurrentAccount, currentChain} = React.useContext(Web3Context);
    const chainSymbol = {
        '0x1': 'Ethereum',
        '0x3': 'Ropsten',
        '0x4': 'Rinkeby',
        '0x5': 'Goerli',
        '0x2a': 'Kovan',
        '0x38': 'BinanceSmartChain Mainnet',
        '0x61': 'BinanceSmartChain Testnet'
    }
    React.useEffect(() => {
        if(localStorage.getItem('account')) {
            setCurrentAccount(localStorage.getItem('account'))
        }
    }, [])
    return (
        <Container>
            {
                currentAccount 
                ? <AccountInput account={currentAccount}></AccountInput> 
                : <AccountInput account={''}></AccountInput>
            }
            <div>
                {
                    chainSymbol[String(currentChain)]
                }
            </div>
        </Container>
    )
}