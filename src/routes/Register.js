import React, { useState } from 'react'
import{Container, Button, Form, Col, Row} from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom';
import RestaurantsApp from '../api/RestaurantsApp';

function Register() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");


    let history = useHistory();

    const submitHandler = async (e) => {
        e.preventDefault();        
        const data = await RestaurantsApp.post('/register', {first_name : firstName, last_name: lastName, email: email, password : password})
        if(data.data.message) {
            setMessage(data.data.message);
            
        }else{
            history.push(`/`);
        }
    }

    return (

        <div className='container' style={{padding: "40px", marginTop: '50px'}}>
            <h1 className='font-weight-light display-2 m-0 text-center'>Restaurants Management App</h1>
            <div className='bg-info ' style={{padding: "50px", marginTop: '50px', boxShadow:"0 8px 6px 2px rgb(0, 0, 0.034)"}}>
            
                <Container className='w-50' >
                    <Row>
                        <Col>
                            <h1 className="text-center pb-4"><i class="fas fa-user-plus"></i> Sign Up</h1>
                            <Form onSubmit = {submitHandler}>
                                {message && <h6 className= 'bg-danger p-3'>{message}</h6>}
                                <Form.Text>
                                    It's quick and easy.
                                </Form.Text>
                                
                                <Form.Group >
                                    
                                    <Form.Control required type="text" placeholder="First Name" className='mt-3' onChange={(e) => setFirstName(e.target.value.replace(/\s/g, ""))} />
                                </Form.Group>

                                <Form.Group >
                                    
                                    <Form.Control required type="text" placeholder="Last Name" className='mt-3' onChange={(e) => setLastName(e.target.value.replace(/\s/g, ""))}/>
                                </Form.Group> 

                                <Form.Group controlId="formBasicEmail">
                                    
                                    <Form.Control required type="email" placeholder="Email Address" className='mt-3'onChange={(e) => setEmail(e.target.value.replace(/\s/g, ""))}/>
                                    
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                   
                                    <Form.Control required type="password" placeholder="Password" className='mt-3' onChange={(e) => setPassword(e.target.value.replace(/\s/g, ""))}/>
                                </Form.Group>
                                
                                <Button variant="dark" type="submit" className='mt-3'>
                                    Sign Up
                                </Button>

                                <Form.Group>
                                    <Form.Label className='mt-3 '>Have an account? <Link to='/'>Login Here</Link></Form.Label>
                                </Form.Group>
                            </Form>
                        </Col>
                        
                    </Row>
                </Container>
            </div>
        
        </div>
    )
}

export default Register
