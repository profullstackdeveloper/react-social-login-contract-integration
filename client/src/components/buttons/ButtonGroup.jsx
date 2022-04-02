import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    width: fit-content;
    height: 40px;
    display: flex;
    align-items: center;
`
const ButtonContainer = styled.div`
    width: 100px;
    height: 100%;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: ${props => props.index == 0 ? '20px 0px 0px 20px' : props.index == props.end - 1 ? '0px 20px 20px 0px' : '0px'};
    background-color: ${props => props.active ? '#6b5b95' : '#40434e' };
    cursor: pointer;
`

const Button = ({content, handleClick, index, end, url}) => {
    return (
        <ButtonContainer index={index} end={end} onClick={() => handleClick(url)} active={window.location.pathname === url}>
            {content}
        </ButtonContainer>
    )
}

export default function ButtonGroup({buttons}) {
    const navigation = useNavigate();
    console.log('params', window.location.pathname);
    return (
        <Container>
            {
                buttons.map((button, index) => {
                    return (
                        <Button index={index} end={buttons.length} handleClick={navigation} url={button.url} content={button.content} key={'button Group' + index}></Button>
                    )
                })
            }
        </Container>
    )
}