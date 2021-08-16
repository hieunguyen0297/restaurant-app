import React, { useContext } from 'react';
import { useState } from 'react';
import {Form, Row, Col, Button} from 'react-bootstrap';
import RestaurantsAPI from '../api/RestaurantsApp.js';
import { RestaurantsContext } from '../context/RestaurantsContext.js';

function AddForm() {

    const { restaurants, setRestaurants } = useContext(RestaurantsContext);

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [priceRange, setPriceRange] = useState('');


  

    const submitForm = async (e) =>{
        e.preventDefault();
        try{ 
            if(name === "" || location === ""){
                return;
            }else{
                const submit = await RestaurantsAPI.post('/', {name: name, location:location, price_range: priceRange});
                setRestaurants([...restaurants, submit.data.data.rows[0]]);
            }
            
            
        }catch (err){
            console.log(err)
        }
    }

    return (
        
            <Form className='p-3 bg-info' onSubmit={submitForm}>
                <Row>
                    <Col xs={3}>
                        <Form.Control placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required/>
                    </Col>
                    <Col xs={3}>
                        <Form.Control placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required/>
                    </Col>
                    
                    <Col xs={3}>
                        <Form.Control as="select" value={priceRange} onChange={(e) => setPriceRange(e.target.value)} required>
                            <option>Price Range From ($)</option>
                            <option>5</option>
                            <option>7</option>
                            <option>10</option>
                            <option>12</option>
                            <option>15</option>
                        </Form.Control>
                    </Col>
                    <Col xs={1} >
                    <i style={{color: "black"}} className="far fa-arrow-alt-circle-left fa-2x"></i>
                    </Col>
                    <Col xs={2}>
                        <Button variant="dark" type='submit' size='md' >Add Restaurant</Button>
                    </Col>
                </Row>
            </Form>
        
            
        
    )
}

export default AddForm
