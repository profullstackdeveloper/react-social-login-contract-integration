import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 250px;
    height: 40px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #6b5b95;
    cursor: pointer;
`

export default function RoundButton({ content }) {
    return (
        <Container>
            {content}
        </Container>
    )
}