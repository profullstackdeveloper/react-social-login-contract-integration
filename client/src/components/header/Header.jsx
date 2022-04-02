import React from 'react';
import styled from 'styled-components';

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

export default function Header () {
    return (
        <Container>
            Login Dashboard
        </Container>
    )
}