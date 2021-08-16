import React from 'react';
import UpdateRestaurant from '../components/UpdateRestaurant'
import image from '../image/image.gif';

function UpdatePage() {
    return (
        <div>
            { localStorage.getItem("remember me") ? (
                    <div>
                        <h1><i class="fas fa-pencil-alt"></i> Update Restaurant</h1>
                        <UpdateRestaurant />
                    </div>
                    
            ) : (
                <div className=' text-center p-4 bg-warning'>
                    <h1>Opps, plese log in !!! <a href='/'>Click here</a></h1>
                    <img className="mt-3 w-50" src={image} alt="My Gif"></img>
                </div>
                    
            )}
            
        </div>
    )
}

export default UpdatePage
