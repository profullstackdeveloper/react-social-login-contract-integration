import React from 'react';
import styled from 'styled-components';
import { Web3Context } from '../context/web3Context';
import Web3 from 'web3';
import TestToken from '../contract/TokenABI.json';
import axios from 'axios';
import Warning from '../components/Warning';

const Container = styled.div`
    width: 100vw;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const BalanceInfo = styled.div`
    display: flex;
    align-items: center;
`
const FYNTokenInfo = styled.div`
    display: flex;
    align-items: center;
`
const CheckSigning = styled.div`
    display: flex;
    align-items: center;
`
const CheckButton = styled.div`
    width: 300px;
    height: 50px;
    background-color: purple;
    color: white;
    font-size: 24px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 20px;
    border-radius: 8px;
    cursor: pointer;
    &:hover{
        background-color: #9f3b9f;
    }
`
const ValueBox = styled.div`
    width: 150px;
    height: 50px;
    font-size: 14px;
    margin: 20px;
    text-align: center;
`
const ReturnedValue = styled.div`
    width: 150px;
    height: 50px;
    color: black;
    font-size: 14px;
    display: flex;
    margin: 20px;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`
const Row = styled.div`
    display: flex;
    max-width: 150px;
    align-items: center;
    justify-content: flex-start;
    word-wrap: break-word;
`

export default function Home() {
    const chainSymbol = {
        '0x1': 'Ethereum',
        '0x3': 'Ropsten',
        '0x4': 'Rinkeby',
        '0x5': 'Goerli',
        '0x2a': 'Kovan',
        '0x38': 'BinanceSmartChain Mainnet',
        '0x61': 'BinanceSmartChain Testnet'
    }
    const web3 = new Web3(window.ethereum);
    const { currentAccount, setDisplayModal, currentChain } = React.useContext(Web3Context);
    const TestTokenContractInstance = new web3.eth.Contract(TestToken.abi, TestToken.address);
    const [balance, setBalance] = React.useState();
    const [fynTokenAmount, setFYNTokenAmount] = React.useState();
    const [signingResult, setSigningResult] = React.useState()
    const [showWarning, setShowWarning] = React.useState(false);
    console.log("home component has been called!", currentAccount)

    React.useEffect(() => {
        if (currentAccount) {
            console.log('toekn instance is ', currentChain)
            if (currentChain == '0x4') {
                setShowWarning(false);
            }
            else {
                setShowWarning(true);
            }
        }
    }, [currentAccount, currentChain])
    const getBalance = async () => {
        const result = await TestTokenContractInstance.methods.balanceOf(currentAccount).call();
        const amount = web3.utils.fromWei(result);
        setBalance(amount);
    }
    const getFynTokenAmount = async () => {
        const fynAmount = await axios.get('https://affyn-api.herokuapp.com/api/polygon/circulating');
        setFYNTokenAmount(fynAmount.data.toLocaleString('fullwide', { useGrouping: false }));
    }
    const checkSigning = async () => {
        console.log(TestTokenContractInstance)
        const result = await TestTokenContractInstance.methods.GetSomeTokens().send({
            from: currentAccount
        })
        setSigningResult(result);
        console.log(result);
    }
    React.useEffect(() => {
        if(signingResult) {
            Object.keys(signingResult).map((key, index) => {
                console.log(key, signingResult[key]);
            })
        }
    }, [signingResult])
    return (
        <Container>
            {
                showWarning ? <Warning isOpen={currentChain != '0x4'} currentChain={chainSymbol[currentChain]}></Warning>
                    : <React.Fragment>
                        <BalanceInfo>
                            <CheckButton onClick={() => getBalance()}>Balance of TestToken is: </CheckButton>
                            <ValueBox>{balance ? balance : ''}</ValueBox>
                        </BalanceInfo>
                        <FYNTokenInfo>
                            <CheckButton onClick={() => getFynTokenAmount()}>Amount of FYN token: </CheckButton>
                            <ValueBox>
                                {
                                    fynTokenAmount ? fynTokenAmount : ''
                                }
                            </ValueBox>
                        </FYNTokenInfo>
                        <CheckSigning >
                            <CheckButton onClick={() => checkSigning()}>Check signing</CheckButton>
                            <ReturnedValue>
                                {
                                    signingResult 
                                    ? Object.keys(signingResult).map((key, index) => {
                                        return (
                                            <Row key={"signingData" + index}>
                                                <div>{key}</div>
                                                <div>:</div>
                                                <div>{JSON.stringify(signingResult[key])}</div>
                                            </Row>
                                        )
                                    })
                                    : ''
                                }
                            </ReturnedValue>
                        </CheckSigning>
                    </React.Fragment>
            }

        </Container>
    )
}