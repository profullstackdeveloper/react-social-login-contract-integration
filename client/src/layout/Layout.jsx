import React from 'react';
import styled from 'styled-components';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`
const HeaderContainer = styled.div`
    flex: 0 0 auto;
`
const ContentContainer = styled.div`
    flex: 1 1 auto;
    overflow-x: hidden;
    overflow-y: auto;
`
const FooterContainer = styled.div`
    flex: 0 0 auto;
`

export default function Layout({ children }) {
    return (
        <Container>
            <HeaderContainer>
                <Header></Header>
            </HeaderContainer>
            <ContentContainer>
                {children}
            </ContentContainer>
            <FooterContainer>
                <Footer></Footer>
            </FooterContainer>
        </Container>
    )
}