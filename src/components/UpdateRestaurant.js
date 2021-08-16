import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router'
import RestaurantsApp from '../api/RestaurantsApp';

function UpdateRestaurant() {

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [priceRange, setPriceRange] = useState('');

    let history = useHistory();
    
    let params = useParams()
    // console.log(params.id);


    useEffect(() => {
        fetchOne(params.id);
    },[])

    //fetch one restaurant
    const fetchOne = async (id) => {
        const {data : {data} } = await RestaurantsApp.get(`/${id}`);
        // console.log(data[0]);
        setName(data[0].name);
        setLocation(data[0].location);
        setPriceRange(data[0].price_range);
    }
    

    const submitHandler = async (e) => {
        e.preventDefault();
        await RestaurantsApp.put(`/${params.id}`,{name: name, location: location, price_range: priceRange});
        
    }

    const goBack = () => {
        history.push(`/restaurants/${params.name}/system/loginsuccess`);
        
    }

    return (
        <div >
            <Button variant="dark" type="submit" className='mb-2 mt-4' onClick={goBack}>
                Go back
            </Button>
            <Form className='bg-warning p-4 form-control w-75' onSubmit={submitHandler}>
                <Form.Group >
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    
                </Form.Group>

                <Form.Group className='mt-2'>
                    <Form.Label>Location</Form.Label>
                    <Form.Control value={location} type="text"onChange={(e) => setLocation(e.target.value)} />
                </Form.Group>

                <Form.Group className='mt-2'>
                    <Form.Label>Price Range <i class="fas fa-dollar-sign"></i></Form.Label>
                    <Form.Control size="md" as="select" value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
                        <option>Price Range</option>
                        <option>5</option>
                        <option>7</option>
                        <option>10</option>
                        <option>12</option>
                        <option>15</option>
                    </Form.Control>
                </Form.Group>
                

                <Form.Group className='mt-3'>
                    <Button variant="dark" type="submit" className='btn-lg'>
                        Submit
                    </Button>
                </Form.Group>

            

                
            </Form>
        </div>
        
    )
}

export default UpdateRestaurant
