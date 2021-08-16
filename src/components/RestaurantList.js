import React, {useEffect, useContext} from 'react';
import {CardDeck, Card, Button} from 'react-bootstrap';
import RestaurantsAPI from '../api/RestaurantsApp'
import { RestaurantsContext } from '../context/RestaurantsContext';
import {useHistory, useParams} from 'react-router-dom';


function RestaurantList() {

    const { restaurants, setRestaurants } = useContext(RestaurantsContext);
    useEffect(() => {
       
        fetchData();
        
    },[])
      
    let param = useParams();
     
    let history = useHistory();
    
    
    const fetchData = async () => {
        const result = await RestaurantsAPI.get('/');
        const data = result.data.data;
        setRestaurants(data);
        // console.log(restaurants)
    }


    const handleDelete = async (id) => {
        await RestaurantsAPI.delete(`/${id}`);
        setRestaurants(restaurants.filter(restaurant => restaurant.id !== id));
    }


    const updateHandler = async (id) => {
        history.push(`/restaurants/${id}/${param.name}/update`);
    
    }

    const cardLinkHandler = (id) => {
        history.push(`/restaurants/${id}/${param.name}/details`);
    }

    // "$".repeat(restaurant.price_range)

    return (
        <CardDeck className='p-3 ' style={{backgroundColor: '#d4ebf2', display: "grid", gridRowGap: "10px", gridTemplateColumns: "1.8fr 1.7fr 1.2fr"}}>
            {restaurants && restaurants.map((restaurant) => {
                return (
                    <Card border="primary" style={{ width: '18rem' }} key={restaurant.id}>
                        <Card.Header><Card.Link style={{cursor:"pointer", textDecoration: "none"}} onClick={() => cardLinkHandler(restaurant.id)} >View Info & Write Reviews</Card.Link></Card.Header>
                        <Card.Body>
                            <Card.Title>{restaurant.name}</Card.Title>
                            <Card.Text>{restaurant.location}</Card.Text>
                            <Card.Text>${(restaurant.price_range)} & up</Card.Text>
                            <Button variant="warning" style={{ marginRight: '5px' }} onClick={() => updateHandler(restaurant.id)}>Update</Button>
                            <Button variant="danger" onClick={() => handleDelete(restaurant.id)}> <i className="far fa-trash-alt"></i></Button>
                        </Card.Body>
                    </Card>
                    
                )
                
            })}
        </CardDeck>

    )

        
            
}

export default RestaurantList
