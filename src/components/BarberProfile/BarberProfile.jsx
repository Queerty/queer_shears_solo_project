import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function BarberProfile() {

    const barber = useSelector(store => store.barbers.barberProfile);
    const history = useHistory();
    const dispatch = useDispatch();
    const params = useParams();

    console.log("******************************", barber);

    //Fetch barber data on page load
    useEffect(() => {
        dispatch({
            type: "GET_BARBER_PROFILE",
            payload: {
                barberId: params.id
            }
        })
    }, [params.id]);

    return(
        <>
        <button onClick={() => history.push('/barber')}>Back to List</button>
        <h2>{barber.full_name}</h2>
        <p> {barber.pronouns}</p>
        <p> {barber.phone}</p>
        <p> {barber.website}</p>
        <p> {barber.facebook}</p>
        <p> {barber.instagram}</p>
        <p> {barber.address}</p>
        <img width="400px" src={barber.avatar_link}/>

        </>
    )
}

export default BarberProfile;