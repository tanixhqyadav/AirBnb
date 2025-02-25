import React ,{useEffect, useState} from 'react'
import { Link , useParams ,Navigate } from 'react-router-dom'
import Perks from '../utils/Perks';
import axios from 'axios';
import PhotoUploader from '../utils/PhotoUploader';
import AccountNav from '../utils/AccountNav';
function PlacesFormPage() {
  const {id}=useParams();
  const {action}=useParams();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(0);
  const [reDirect,setReDirect]=useState(false);
  useEffect(() => {
    if(!id) return;
    axios.get(`/places/${id}`)
    .then(response => {
      const place = response.data;
      setTitle(place.title);
      setAddress(place.address);
      setDescription(place.description);
      setAddedPhotos(place.photos);
      setPerks(place.perks);
      setExtraInfo(place.extraInfo);
      setCheckIn(place.checkIn);
      setCheckOut(place.checkOut);
      setMaxGuests(place.maxGuests);
      setPrice(place.price);
    }
    )
  }, [id]);
      
  
  
  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
      id,
      title, address, 
      description, photos: addedPhotos, perks, 
      extraInfo, checkIn, checkOut, maxGuests, price
    }
    if(id){ 
      try {
        await axios.put(`/places`,placeData);
        setReDirect(true);
    } catch (error) {
        console.log(error);
        alert(error.response?.data?.message || 'Failed to update place');
    }
  }
    else{
    // Check for missing fields
    const missingFields = [];
    if (!title) missingFields.push('Title');
    if (!address) missingFields.push('Address');
    if (!description) missingFields.push('Description');
    if (!checkIn) missingFields.push('Check-In Time');
    if (!checkOut) missingFields.push('Check-Out Time');
    if (!maxGuests) missingFields.push('Max Guests');
    if (!price) missingFields.push('Price');

    // Show an alert with the missing fields
    if (missingFields.length > 0) {
        alert(`Please fill in the following required fields:\n- ${missingFields.join('\n- ')}`);
        return;
    }
    try {
        await axios.post('/places', placeData);
        setReDirect(true);
    } catch (error) {
        alert(error.response?.data?.message || 'Failed to create place');
    }
  }
}
  function inputHeader(text) {
    return (
      <h2 className="text-2xl mt-4">{text}</h2>
    );
  }
  function inputDescription(text) {
    return (
      <p className="text-gray-500 text-sm">{text}</p>
    );
  }
  function preInput(header,description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }
  if(reDirect){
    return <Navigate to={'/account/places '}/>
  }
  return (
    <div>
      <AccountNav/>
      <form onSubmit={savePlace}>
        {preInput('Title', 'Title for your place. should be short and catchy as in advertisement')}
        <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, for example: My lovely apt"/>
        {preInput('Address', 'Address to this place')}
        <input type="text" value={address} onChange={ev => setAddress(ev.target.value)}placeholder="address"/>
        {preInput('Photos','more = better')}
        <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {preInput('Description','description of the place')}
        <textarea value={description} onChange={ev => setDescription(ev.target.value)} />
        {preInput('Perks','select all the perks of your place')}
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks} />
        </div>
        {preInput('Extra Information','house rules, etc')}
        <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />
        {preInput('CheckInTme & CheckOut  Times','add check in and out times, remember to have some time window for cleaning the room between guests')}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Check In Time</h3>
            <input type="text"
                  value={checkIn}
                  onChange={ev => setCheckIn(ev.target.value)}
                  placeholder="14:00"/>
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check Out Time</h3>
            <input type="text"
                  value={checkOut}
                  onChange={ev => setCheckOut(ev.target.value)}
                  placeholder="11:00" />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Guest Occupancey</h3>
            <input type="number" value={maxGuests}
                  onChange={ev => setMaxGuests(ev.target.value)}/>
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per night</h3>
            <input type="number" value={price}
                  onChange={ev => setPrice(ev.target.value)}/>
          </div>
        </div>
        <button className="primary my-4">Save</button>
      </form>
    </div>
  )
}

export default PlacesFormPage