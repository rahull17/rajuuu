import { useContext, useEffect, useState } from "react";
import {differenceInCalendarDays} from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function BookingWids({place}){
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setcheckOut] = useState('');
    const [numOfGuests,setNumOfGuests] = useState(1);
    let numofNights = 0;
    const [name,setName] = useState('');
    const[phone,setPhone] = useState('');
    const [redirect, setRedirect] = useState('');
    const {user} = useContext(UserContext);

    useEffect(() => {
        if(user){
            setName(user.name);
        }
    },[user])

    if(checkIn && checkOut){
        numofNights = differenceInCalendarDays( new Date(checkOut), new Date(checkIn));
    }
    async function bookThisPlace(){
        const response = await axios.post('/bookings',{place:place._id ,checkIn,checkOut,numOfGuests,name,phone, price: numofNights * place.price});
        const bookingId = response.data._id;
        setRedirect('/account/bookings/'+bookingId)
    }

    if(redirect){
        return <Navigate to={redirect} />
    }

    return (
        <div className="bg-white rounded-2xl shadow p-4">
                <div>
                    <h2 className="text-2xl text-center pb-2">
                                Price: ${place.price} / per Night
                    </h2>
                </div>
                <div className="border rounded-2xl ">
                    <div className="flex">
                            <div className="py-3 px-4" >
                                <label>checkIn:</label>
                                <input type="date" value={checkIn} onChange={eve => setCheckIn(eve.target.value)} />
                            </div>
                            <div className="py-3 px-4 border-l" >
                                <label>checkOut:</label>
                                <input type="date" value={checkOut} onChange={eve => setcheckOut(eve.target.value)}  />
                            </div>
                    </div>
                        <div className="py-3 px-4 border-t" >
                                <label>Number Of Guests</label>
                                <input type="number"  value={numOfGuests} onChange={eve => setNumOfGuests(eve.target.value)}/>
                        </div>
                        {numofNights > 0 && (
                        <>
                            <div className="py-3 px-4 border-t">
                                <label>Your Name:</label>
                                <input type="text" value={name} onChange={eve => setName(eve.target.value)} />
                            </div>
                            <div className="py-3 px-4 border-t">
                                <label>Phone Number:</label>
                                <input type="tel" value={phone} onChange={eve => setPhone(eve.target.value)} />
                            </div>
                        </>
                        )}
                </div>
                <button onClick={bookThisPlace} className="primary mt-2">Book this place for
                    {numofNights > 0 && (
                        <span> ${numofNights * place.price}</span>
                    )}
                
                </button>      
        </div>
    );
}