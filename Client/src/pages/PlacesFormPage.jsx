import PhotosUploader from "../PhotosUploader";
import Perks from "../Perks";
import { useEffect, useState } from "react";
import axios from "axios";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";

export default function(){
    const {id} = useParams();
    const [title, setTitle] = useState("");
    const [address, setaddress] = useState("");
    const [addedphotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState("");
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setcheckOut] = useState("");
    const [maxGuests, setMaxGuests] = useState(1);
    const [price,setPrice] = useState(100);
    const [redirect,setRedirect] = useState(false);
     useEffect(() => {
      if (!id){
        return;
      } 
      axios.get('/places/'+id).then(response => {
        const {data} = response;
        setTitle(data.title);
        setaddress(data.address);
        setAddedPhotos(data.photos);
        setDescription(data.description);
        setPerks(data.perks);
        setExtraInfo(data.extraInfo);
        setCheckIn(data.checkIn);
        setcheckOut(data.checkOut);
        setMaxGuests(data.maxGuests);
        setPrice(data.price);
      })
    },[id]);


    function inputHeader(text) {
      return <h2 className="text-2xl mt-4">{text}</h2>;
    }
    function inputDescription(text) {
      return <p className="text-gray-500 text-sm mb-2">{text}</p>;
    }

    function preInput(header, description) {
      return (
        <>
          {inputHeader(header)}
          {inputDescription(description)}
        </>
      );
    }

    function savePlace(eve) {
      eve.preventDefault();
      const placeData = {
        title,address,
        addedphotos,description,perks,extraInfo,
        checkIn,checkOut,maxGuests,price
      };
      console.log(id);
      if(id){
        //update that place
        axios.put('/places', {
          id, ...placeData
        });
         setRedirect(true);

      } else {
        //its a new place
        axios.post("/places", placeData);
        setRedirect(true);
      }
    }

    if(redirect){
        return <Navigate to={'/account/places'}/>
    }


    return (
      <div>
        <AccountNav />
        <form onSubmit={savePlace}>
          {preInput("Title", "Title for your place")}
          <input
            type="text"
            value={title}
            onChange={(eve) => setTitle(eve.target.value)}
            placeholder="titel, Hotel Name"
          />
          {preInput("Address", "Address for your place")}
          <input
            type="text"
            value={address}
            onChange={(eve) => setaddress(eve.target.value)}
            placeholder="address"
          />
          {preInput("Photos", "Photos for your place")}
          <PhotosUploader addedphotos={addedphotos} onChange={setAddedPhotos} />
          {preInput("Description", "Desciption for your place")}
          <textarea
            value={description}
            onChange={(eve) => setDescription(eve.target.value)}
          />
          {preInput("Perks", "Perks select all the perks")}
          <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            <Perks selected={perks} onChange={setPerks} />
          </div>
          {preInput("Extra Info", "House Rules for your place")}
          <textarea
            value={extraInfo}
            onChange={(eve) => setExtraInfo(eve.target.value)}
          />
          {preInput("Check in & out times", "add check in & check out times")}
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-2">
            <div>
              <h3 className="mt-2 -mb-1"> Check In time</h3>
              <input
                value={checkIn}
                onChange={(eve) => setCheckIn(eve.target.value)}
                type="text"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Check Out time</h3>
              <input
                value={checkOut}
                onChange={(eve) => setcheckOut(eve.target.value)}
                type="text"
              />
            </div>
            <div>
              <h3>Max Members</h3>
              <input
                value={maxGuests}
                onChange={(eve) => setMaxGuests(eve.target.value)}
                type="text"
              />
            </div>
            <div>
              <h3>Price Per Night</h3>
              <input value={price} onChange={(eve) => setPrice(eve.target.value)} type="text"/>
            </div>
          </div>
          <div className="my-4">
            <button className="primary">Save</button>
          </div>
        </form>
      </div>
    );
}