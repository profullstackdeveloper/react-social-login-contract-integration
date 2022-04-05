import React from 'react';
import styled from 'styled-components';
import RoundButton from '../../buttons/RoundButton';
import SignUpButton from '../../buttons/SignUpButton';
import InputForm from '../../input/InputForm';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Web3Context } from '../../../context/web3Context';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Warning = styled.div`
    color: red;
`

export default function SignIn() {
    const [displayWarning, setDisplayWarning] = React.useState(false);
    const {currentAccount, setCurrentAccount} = React.useContext(Web3Context);
    const navigate = useNavigate();
    const handleResolve = async (provider, data) => {
        console.log("handleResolve called!")
        axios.post('http://localhost:3000/api/signIn', {
            email: data.email,
            fullName: data.name,
            wallet: currentAccount
        }).then((response) => {
            console.log(response.status);
            if (response.status == 404) {
                console.log("eror!")
                setDisplayWarning(true);
            }
            if (response.status == 200) {
                console.log(response.data)
                localStorage.setItem('user', JSON.stringify(response.data.user))
                navigate('/home');
            }
        }).catch((err) => {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
            if (err.response.status == 404) {
                console.log("eror!")
                setDisplayWarning(true);
            }
            if (err.response.status == 200) {
                console.log('success')
                localStorage.setItem('user', JSON.stringify(err.response.data.user))
                navigate('/home');
            }
        })
    }
    return (
        <Container>
            <InputForm title='full name'></InputForm>
            <InputForm title='e-mail address'></InputForm>
            <InputForm title='password'></InputForm>
            <RoundButton content={'SignIn with Email'}></RoundButton>
            <div style={{ marginTop: '20px', marginBottom: '20px' }}>OR</div>
            <SignUpButton content={'SignIn with Google'} handleResolve={handleResolve} setAccount={setCurrentAccount}></SignUpButton>
            {
                displayWarning ? <Warning>You are not signed up yet. Please <a href='/login/register'>sign up</a> first!</Warning> : ''
            }
        </Container>
    )
}