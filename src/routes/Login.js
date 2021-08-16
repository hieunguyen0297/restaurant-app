import React, { useState } from 'react'
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap'
import image from '../image/image.jpg';
import {Link, useHistory} from 'react-router-dom';
import RestaurantsApp from '../api/RestaurantsApp';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    localStorage.clear();


    let history = useHistory();

    const loginSubmit = async (e) => {
        e.preventDefault();
        const data = await RestaurantsApp.post('/login', {email: email, password: password});
        
        if(data.data.message){
            
            setMessage(data.data.message);
        }else{
            // console.log(data)
            localStorage.setItem('remember me', data.data.token)
            history.push(`/restaurants/${data.data.result.rows[0].first_name}/system/loginsuccess`);
        }
    }

    return (
        <div style={{padding: "40px", marginTop: '50px'}}>
            <h1 className='font-weight-light display-2 text-center'>Restaurants Management App</h1>
            <div className='bg-info' style={{padding: "50px", marginTop: '50px', boxShadow:"0 8px 6px 2px rgb(20, 0, 0.034)"}}>
            
                <Container >
                    <Row>
                        <Col>
                            <h1 className="text-center pb-4"><i class="fas fa-sign-in-alt"></i> Welcome Back !</h1>
                            {message && <div className='bg-danger p-2 mb-2 text-white'>{message}</div>}
                            <Form onSubmit={loginSubmit}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control required type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>                                    
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Control required type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className='mt-3'/>
                                </Form.Group>
                                
                                <Button variant="primary" type="submit" className='mt-3'>
                                    Login
                                </Button>

                                <Form.Group >
                                    <Form.Label className='mt-3 '>Don't have an account? <Link to='/register'>Sign-Up Here</Link></Form.Label>
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col>
                            <Image src={image} className='w-100 h-100'/>
                        </Col>
                    </Row>
                </Container>
            </div>
        
        </div>
        
    )
}

export default Login
