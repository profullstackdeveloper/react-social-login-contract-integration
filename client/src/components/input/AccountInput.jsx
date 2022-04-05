import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    align-items: center;
`
const Avatar = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 20px;
`
const Input = styled.div`
    height: 30px;
    width: 72px;
    outline: none;
    border: 1px solid black;
    border-radius: 15px;
    background-color: white;
    color: black;
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
`

export default function AccountInput ({account}) {
    const displayText = account.slice(0, 6) + '...' + account.slice(account.length - 2, account.length);
    return (
        <Container>
            <Avatar src='/assets/images/avatar/avatar.png'></Avatar>
            <Input>{displayText}</Input>
        </Container>
    )
}