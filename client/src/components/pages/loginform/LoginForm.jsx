import React from 'react';
import styled from 'styled-components';
import ButtonGroup from '../../buttons/ButtonGroup';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';

const Container = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 8px;
    color: white;
    backdrop-filter: blur(18px);
    display: flex;
    align-items: center;
    justify-content: end;
`

const FormContainer = styled.div`
    width: 600px;
    height: 100%;
    background-color: rgba(0,0,0,0.7);
    display: flex;
    flex-direction: column;
    align-items: center;
`

const ButtonContainer = styled.div`
    width: calc(100% - 40px);
    padding: 10px 20px;
    padding-bottom: 40px;
    display: flex;
    justify-content: flex-end;
`

export default function LoginForm() {
    const buttons = [
        {
            content: 'SignIn',
            url: 'login',
        },
        {
            content: 'SignUp',
            url: 'register',
        }
    ]
    return (
        <Container>
            <FormContainer>
                <ButtonContainer>
                    <ButtonGroup buttons={buttons}></ButtonGroup>
                </ButtonContainer>
                <Routes>
                    <Route path='login' element={<SignIn></SignIn>}></Route>
                    <Route path='register' element={<SignUp></SignUp>}></Route>
                    <Route path='*' element={<SignIn/>}></Route>
                </Routes>
                
            </FormContainer>
        </Container>
    )
}