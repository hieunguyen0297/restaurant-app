import React from 'react'
import Header from '../components/Header';
import AddForm from '../components/AddForm';
import RestaurantList from '../components/RestaurantList';
import image from '../image/image.gif';

function Homepage() {
    

    return (
       
            <div className='text-center p-3'>
                { localStorage.getItem("remember me") ? (
                    <div>
                        <Header />
                        <AddForm />
                        <RestaurantList />
                    </div>
                    
                ) : (
                    <div className='p-5 bg-warning'>
                        <h1>Opps, plese log in !!! <a href='/'>Click here</a></h1>
                        <img className="mt-3 w-50" src={image} alt="My Gif"></img>
                    </div>
                    
                )}
                
            </div>
      
        
    )
}

export default Homepage
