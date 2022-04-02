import React from 'react';
import styled from 'styled-components';

const Container = styled.div`

`
const Title = styled.div`
    text-transform: uppercase;
    color: white;
`
const Input = styled.input`
    width: 300px;
    padding: 10px 5px;
    border: 0px;
    border-bottom: 1px solid white;
    outline: none;
    background-color: transparent;
    color: white;
    margin-bottom: 20px;
`

export default function InputForm ({title=''}) {
    return (
        <Container>
            <Title>
                {title}
            </Title>
            <Input placeholder={'Enter your ' + title}></Input>
        </Container>
    )
}