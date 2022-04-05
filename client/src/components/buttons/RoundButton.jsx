import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 250px;
    height: 40px;
    cursor: pointer;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #6b5b95;
    &:hover {
        background-color: #8275a3;
    }
`

export default function RoundButton({ content, handleClick }) {
    return (
        <Container onClick={() => handleClick ? handleClick() : () => {}}>
            {content}
        </Container>
    )
}