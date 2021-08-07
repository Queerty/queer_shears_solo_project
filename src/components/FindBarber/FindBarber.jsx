import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function BarberList() {


    useEffect(() => {
        dispatch({ type: "FETCH_BARBERS"})
        dispatch({ type: "FETCH_REVIEWS"})
    }, []);

    const dispatch = useDispatch();
    const barbers = useSelector(store => store.barbers.barbers);
    const reviews = useSelector(store => store.reviews.reviews);
    const history = useHistory();
    
    const onBarberProfile = (barberId) => {
        console.log('Clicked barber with id:', barberId);
        dispatch({ type: 'GET_BARBER_REVIEWS', payload: barberId})
        history.push(`/profile/${barberId}`); //req.params.id
    }
    console.log("This is log barbers in barber list***************************",barbers);
    console.log("####################This is reviews", reviews);

    return (
        <main>
            <h1>Barber List</h1>
            {barbers.map(barber => {
                return (
                    <div key={barber.id}>
                        <h2 onClick={() => onBarberProfile(barber.id)}>{barber.full_name}</h2>
                        <h4>{barber.pronouns}</h4>
                        <img width="300px" src={barber.avatar_link} onClick={() => onBarberProfile(barber.id)}/>
                        <p>Phone: {barber.phone}</p>
                        <p>Website: {barber.website}</p>
                        <p>Socials:</p>
                        <p>Address: {barber.address}</p>
                        
                        </div>
                )
            })}
        </main>
    )
}

export default BarberList;