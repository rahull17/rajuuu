import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookingWids from "../BookingWids";
import PlaceGallery from "../PlaceGallery";



export default function PlacePage(){
    const {id} = useParams();
    const [place,setPlace] = useState(null);

    useEffect(() => {
        if(!id){
            return;
        }
        axios.get('/places/'+id).then(response => {
            setPlace(response.data);
        })
    },[id]);

    if(!place) return '';



    return (
        <div className="mt-4 bg-gray-200 -mx-8 px-8 pt-8">
            <h1 className="text-3xl">{place.title}</h1>
            <a target="_blank" className=" my-2 block font-semibold underline" href= {'https://maps.google.com/?q='+place.address}>{place.address}</a>
            <PlaceGallery place={place}/>
            <div className="grid mt-8 gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
                <div>
                    <div className="my-4">
                        <h2 className="font-semibold text-2xl">Description</h2>
                        <p className="">{place.description}</p>
                    </div>
                    <h2>Check-in: {place.checkIn}</h2>
                    <h2>Check-out: {place.checkOut}</h2>
                    <h2>Max Number of Guests: {place.maxGuests}</h2>
                </div>
                <div>
                    <BookingWids place={place}/>
                </div>
            </div>
            <div className="bg-white px-8 py-8 mt-3 -mx-8 border-t">
                    <h2 className="font-semibold text-2xl">ExtraInfo</h2>
                    <div className="text-sm mb-4 bt-1 text-gray-600 leading-5">Important:- {place.extraInfo} </div>
            </div>
        </div>
    );

}