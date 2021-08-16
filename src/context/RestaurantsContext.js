import React, {useState, createContext} from 'react'

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = props => {

    //we can pass more useState here and use it in another place
    const [restaurants, setRestaurants] = useState([]);
    


    //pass the value and setValue as well/ 
    return (
        <RestaurantsContext.Provider value={{restaurants, setRestaurants}}>
            {props.children}
        </RestaurantsContext.Provider>
    )
}
