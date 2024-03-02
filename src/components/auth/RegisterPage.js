import React, { useState } from 'react';
import { BrowserRouter as Router, useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Row, Col } from 'antd';
import { signUp } from '@aws-amplify/auth';

const RegisterPage = () => {
    

    return (
        <Router>
            <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
                <Col span={8}>
                    <h1>Register</h1>
                    
                </Col>
            </Row>
        </Router>
    );
};

export default RegisterPage;
