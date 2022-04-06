import React from 'react';
import styled from 'styled-components';
import RoundButton from '../../buttons/RoundButton';
import SignUpButton from '../../buttons/SignUpButton';
import InputForm from '../../input/InputForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Web3Context } from '../../../context/web3Context';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export default function SignIn() {
    const navigate = useNavigate();
    const {currentAccount} = React.useContext(Web3Context);
    const handleResolve = (provider, data) => {
        axios.post('http://localhost:3000/api/googleSignUp', {
            email: data.email,
            fullName: data.name,
            wallet: currentAccount
        }).then((response) => {
            if (response.status == 404) {
                console.log('error occurred!')
            }
            if (response.status == 200) {
                localStorage.setItem('user', JSON.stringify(response.data.newUser));
                navigate('/home');
                return;
            }
            if (response.status == 201) {
                localStorage.setItem('user', JSON.stringify(response.data.user))
                navigate('/home');
                return;
            }
        }).catch((err) => {
            if (err.response.status == 404) {
                console.log('error occurred!')
            }
            if (err.response.status == 200) {
                localStorage.setItem('user', JSON.stringify(err.response.data.newUser))
                navigate('/home');
                return;
            }
            if (err.response.status == 201) {
                localStorage.setItem('user', JSON.stringify(err.response.data.user))
                navigate('/home');
                return;
            }
        })
    }
    return (
        <Container>
            <InputForm name="fullName" title='full name'></InputForm>
            <InputForm name='email' title='e-mail address'></InputForm>
            <InputForm name='password' title='password'></InputForm>
            <RoundButton content={'SignUp with Email'}></RoundButton>
            <div style={{ marginTop: '20px', marginBottom: '20px' }}>OR</div>
            <SignUpButton content={'SignUp with Google'} handleResolve={handleResolve}></SignUpButton>
        </Container>
    )
}