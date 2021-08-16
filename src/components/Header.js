import React from 'react'
import { useParams } from 'react-router'

function Header() {

    
    let param = useParams();
    
    

    return (
        <div style={{display:"flex", justifyContent:"space-around"}} className='bg-info'>
            <h1 className='font-weight-light display-3 m-0'><i className="fab fa-react fa-xs fa-spin"></i> <i className="fab fa-node fa-xs "></i> Restaurants App</h1>
            <div style={{display:"flex", alignItems:"center", fontSize:"20px", fontWeight:"500"}}>
                <button  className="m-3">{param.name}</button>
                <button><a href="/" className='text-danger'>Logout</a></button>
            </div>
            
        
        </div>
    )
}

export default Header
