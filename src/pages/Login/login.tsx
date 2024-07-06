import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, FormContainer, Title, Form, InputGroup, Label, Input, Button } from './login.style'

const Login: React.FC = () => {
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        navigate('/dashboard');
    };

    return (
        <Container>
            <FormContainer>
                <Title>Login Page</Title>
                <Form onSubmit={handleSubmit}>
                    <InputGroup>
                        <Label htmlFor="username">Username:</Label>
                        <Input type="text" id="username" name="username" />
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor="password">Password:</Label>
                        <Input type="password" id="password" name="password" />
                    </InputGroup>
                    <Button type="submit">Login</Button>
                </Form>
            </FormContainer>
        </Container>
    );
};

export default Login;
