import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function BarberList() {


    useEffect(() => {
        dispatch({ type: "FETCH_BARBERS"})
    }, []);

    

    const dispatch = useDispatch();
    const barbers = useSelector(store => store.barbers.barbers);
    const history = useHistory();
    const onBarberProfile = (barberId) => {
        history.push(`/profile/${barberId}`); //req.params.id
    }
    console.log("This is log barbers in barber list***************************",barbers);

    return (
        <main>
            <h1>Barber List</h1>
            {barbers.map(barber => {
                return (
                    <div key={barber.id}>
                        <h3>{barber.full_name}</h3>
                        <img width="300px" src={barber.avatar_link} onClick={() => onBarberProfile(barber.id)}/>
                        </div>
                )
            })}
        </main>
    )
}

export default BarberList;