import React from 'react';
import Web3 from 'web3';

export const Web3Context = React.createContext({});

export default function Web3ContextProvider({ children }) {
    const [provider, setProvider] = React.useState();
    const [walletStatus, setWalletStatus] = React.useState(false);
    const [currentAccount, setCurrentAccount] = React.useState();
    const [currentChain, setCurrentChain] = React.useState();
    const [displayModal, setDisplayModal] = React.useState(true);
    React.useEffect(() => {
        if(window.ethereum) {
            setWalletStatus(true);
            setProvider(window.ethereum);
        } else {
            setWalletStatus(false);
        }
    }, [])
    React.useEffect(() => {
        if(provider) {
            const web3 = new Web3(provider);
            web3.eth.getChainId().then((_chainId) => {
                setCurrentChain('0x' + _chainId.toString(16));
            })
        }
    }, [provider])
    React.useEffect(() => {
        if(window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts) => {
                setCurrentAccount(accounts[0]);
            });
            window.ethereum.on('chainChanged', (chainId) => {
                setCurrentChain(chainId.toString(16));
            })
        }
    })

    return (
        <Web3Context.Provider
            value={{
                provider,
                setProvider,
                currentAccount,
                setCurrentAccount,
                currentChain,
                setCurrentChain,
                walletStatus,
                setWalletStatus,
                displayModal,
                setDisplayModal
            }}
        >
            {children}
        </Web3Context.Provider>
    )
}