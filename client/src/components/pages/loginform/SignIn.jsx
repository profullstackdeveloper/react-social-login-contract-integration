import React from 'react';
import styled from 'styled-components';
import RoundButton from '../../buttons/RoundButton';
import InputForm from '../../input/InputForm';

const Container = styled.div``

export default function SignIn() {
    return (
        <Container>
            <InputForm title='full name'></InputForm>
            <InputForm title='e-mail address'></InputForm>
            <InputForm title='password'></InputForm>
            <RoundButton content={'SignIn'}></RoundButton>
        </Container>
    )
}