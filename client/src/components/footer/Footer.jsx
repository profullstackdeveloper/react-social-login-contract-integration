import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 100vw;
    height: 100px;
    background-color: black;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
`

export default function Footer () {
    return (
        <Container>
            This is footer!
        </Container>
    )
}