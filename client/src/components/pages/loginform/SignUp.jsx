import React from 'react';
import styled from 'styled-components';
import SignUpButton from '../../buttons/SignUpButton';
import InputForm from '../../input/InputForm';

const Container = styled.div``

export default function SignIn() {
    const handleLoginSuccess = (user) => {
        console.log(user)
    }
    return (
        <Container>
            <InputForm title='full name'></InputForm>
            <InputForm title='e-mail address'></InputForm>
            <InputForm title='password'></InputForm>
            <SignUpButton
                provider='google' 
                appId='476229780716-cjndugdojolfj7kmiqguq2h7aald9b2m.apps.googleusercontent.com' 
                onLoginSuccess={handleLoginSuccess} 
                onLoginFailure={handleLoginSuccess} 
                content={'Sign up with Google'}
            ></SignUpButton>
        </Container>
    )
}