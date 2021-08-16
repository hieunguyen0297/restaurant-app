import React, { useEffect, useState } from 'react'
import { Button, Form, Collapse, Card } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router'
import RestaurantsApp from '../api/RestaurantsApp';
import image from '../image/image.gif';


function RestaurantDetailPage(props) {

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [personName, setPersonName] = useState('');
    const [rating, setRating] = useState('');
    const [description, setDescription] = useState("");
    const [open, setOpen] = useState(false);
    
    const [reviews, setReviews] = useState([]);

    let params = useParams();
    let history = useHistory();

    useEffect (() => {
        fetchOneRestaurant(params.id);
        fetchAllReviews(params.id);
    },[])

    //fetch data for this restaurant
    const fetchOneRestaurant = async (id) => {
        const {data: {data}} = await RestaurantsApp.get(`/${id}`);
        setName(data[0].name);
        setLocation(data[0].location);
        setPriceRange(data[0].price_range);
    }


    //get all reviews
    const fetchAllReviews = async (id) => {
        const data = await RestaurantsApp.get(`/reviews/${id}`);
        const response = data.data.data;
    
        setReviews(response);

        // console.log(response)
        // console.log(reviews)
    }



    const addReview = async (e) => {
        e.preventDefault();
        const data = await RestaurantsApp.post(`/review/${params.id}`, {id: params.id, reviewer: personName, description: description, rating: rating});
        // console.log( data.data.data[0]);
        setReviews([...reviews, data.data.data[0]]);
        setPersonName('');
        setDescription('');
        setRating('');
    }


    const goBack = () => {
        history.push(`/restaurants/${params.name}/system/loginsuccess`);
    }

    return (
        
        <div className='container bg-light'>
            {localStorage.getItem('remember me') ? (

            
                <div className='container w-75'>
                    <Button className="btn-dark mb-3 mt-3" onClick={goBack}>Go back</Button>
                    <h1 className="pb-4"><i className="fas fa-utensils bg-info p-2"></i> Restaurant Detail</h1>
                    <div className="border border-primary w-100 p-3">
                        <h5><i className="fas fa-signature p-1"></i><strong>Restaurant Name</strong>: {name}</h5>
                        <h5><i className="fas fa-map-marker-alt p-2"></i><strong>Location</strong>: {location}</h5>
                        <h5><i className="fas fa-dollar-sign p-2"></i><strong>Price Range</strong>: {priceRange} <i class="fas fa-arrow-up"></i></h5>
                    </div>
                    <div className=" mt-3">
                        <h1><i className="fas fa-gavel p-2 bg-info"></i> Add a Review</h1>
                        <>
                            <Button
                                onClick={() => setOpen(!open)}
                                aria-controls="example-collapse-text"
                                aria-expanded={open}
                            >
                                Click to Add a Review
                            </Button>
                            <Collapse in={open}>
                                <div id="example-collapse-text">
                                    <Form className=' p-3 mt-3 form-control w-100' onSubmit={addReview}>
                                        <Form.Group >
                                            <Form.Label><strong>Your Name</strong></Form.Label>
                                            <Form.Control type="text" value={personName} placeholder="Enter your name" onChange={(e) => setPersonName(e.target.value)} />
                                        
                                        </Form.Group>

                                        <Form.Group className='mt-3'>
                                            <Form.Label><strong>Rating</strong> (<i className="far fa-star"></i>)  </Form.Label>
                                            <Form.Control as="select" value={rating} type="text"onChange={(e) => setRating(e.target.value)} >
                                                <option>Choose a Rating</option>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Form.Control>   
                                            
                                        </Form.Group>
                                        <Form.Group className="mt-3">
                                            <Form.Label><strong>Description</strong></Form.Label>
                                            <Form.Control value={description} as="textarea" rows={3}  onChange={(e) => setDescription(e.target.value) }/>
                                        </Form.Group>

                                        <Button type="submit" className="mt-3">Submit</Button>
                                    </Form>
                                </div>
                            </Collapse>
                        </>

                        {/* display review */}
                        
                        <div className="pt-4 pb-4" style={{display: "grid", gridTemplateColumns:"1fr 1fr 1fr", gridGap: "12px", gridRowGap: "12px"}}>
                            {reviews.map((review) => {
                                return ( 
                                    <Card style={{ width: '18rem' }} key={review.review_id} className='bg-warning'>                   
                                        <Card.Body>
                                            <Card.Title>{review.reviewer}</Card.Title>
                                            <Card.Text>
                                            {review.description}
                                            </Card.Text>
                                            
                                            {review.rating === 1 && 
                                                <Card.Text>
                                                <i class="fas fa-star"></i> 
                                                <i class="far fa-star"></i>
                                                <i class="far fa-star"></i>
                                                <i class="far fa-star"></i>
                                                <i class="far fa-star"></i>
                                                </Card.Text>
                                            }
                                            {review.rating === 2 && 
                                                <Card.Text>
                                                <i class="fas fa-star"></i> 
                                                <i class="fas fa-star"></i> 
                                                <i class="far fa-star"></i>
                                                <i class="far fa-star"></i>
                                                <i class="far fa-star"></i>
                                                </Card.Text>
                                            }
                                            {review.rating === 3 && 
                                                <Card.Text>
                                                <i class="fas fa-star"></i> 
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                                <i class="far fa-star"></i>
                                                <i class="far fa-star"></i>
                                                </Card.Text>
                                            }
                                            {review.rating === 4 && 
                                                <Card.Text>
                                                <i class="fas fa-star"></i> 
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                                <i class="far fa-star"></i>
                                                </Card.Text>
                                            }
                                            {review.rating === 5 && 
                                                <Card.Text>
                                                <i class="fas fa-star"></i> 
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                                </Card.Text>
                                            } 
                                        </Card.Body>
                                    </Card>
                                )
                            })}
                            
                        </div>
                    </div>
                </div>
            ) :(
                <div className='text-center p-4 bg-warning'>
                    <h1>Opps, plese log in !!! <a href='/'>Click here</a></h1>
                    <img className="mt-3 w-50" src={image} alt="My Gif"></img>
                </div>
            )}
        </div>
    )
}

export default RestaurantDetailPage
