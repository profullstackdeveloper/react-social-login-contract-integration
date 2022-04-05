import React from 'react';
import { GoogleLoginButton } from 'react-social-login-buttons';
import styled from 'styled-components';
import { LoginSocialGoogle, } from 'reactjs-social-login';
import Web3 from 'web3';

// const Container = styled.div`
//     width: 250px;
//     height: 40px;
//     border-radius: 20px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     background-color: #6b5b95;
//     cursor: pointer;
// `

// function SignUpButton({ content }) {
//     console.log("signup Button: ", content)
//     return (
//         <Container>
//             {content}
//         </Container>
//     )
// }

// export default SocialLogin(SignUpButton);

export default function SignUpButton({ content, handleResolve, setAccount }) {
    const googleRef = React.useRef();

    return (
        <LoginSocialGoogle
            ref={googleRef}
            client_id={"476229780716-ip4dhebu05l3nrhrghv7b1lojf5hka3c.apps.googleusercontent.com"}
            onResolve={async ({ provider, data }) => {
                console.log(provider, data)
                if (handleResolve) {
                    handleResolve(provider, data);
                }
            }}
            onReject={(err) => {
                console.log('error occurred', err);
            }}
        >
            <GoogleLoginButton>{content}</GoogleLoginButton>
        </LoginSocialGoogle>
    )
}