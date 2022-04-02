import React from 'react';
import styled from 'styled-components';
import LoginForm from '../components/pages/loginform/LoginForm';

const Container = styled.div`
    width: 100vw;
    height: calc(100vh - 200px);
    background-image: url('assets/images/backgrounds/login_background.webp');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`
export default function LoginPage() {
    return (
        <Container>
            <LoginForm></LoginForm>
        </Container>
    )
}