import React, { useEffect ,useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import PlaceGallery from '../utils/PlaceGallery'
import BookingWidget from '../utils/BookingWidget'

function SinglePage() {
    const {id}=useParams();
    const [place,setPlace]=useState(null)
    useEffect(()=>{
        if(!id){
            return ;
        }
        axios.get(`/places/${id}`).then(res=>{
            setPlace(res.data)
        })
    },[id])
    if(!place){
        return 'Hola Amigo'
    }
  return (
    <div className='mt-4 mb-4 bg-gray-100 -mx-8 px-8 pt-8'>
        <h1 className='text-3xl' >{place.title}</h1>
        <a className='bold flex gap-1 my-3 font-semibold underline' target="_blank" href={'https://maps.google.com/?q='+place.address}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
            {place.address}
        </a>
        <PlaceGallery place={place} />
        
        <div className=' mt-8 gap-8 grid grid-cols-1  md:grid-cols-[2fr_1fr]'>
            <div>
                <div className='my-4' >
                    <h2 className='font-semibold text-2xl' >
                        Description
                    </h2>
                    {place.description}
                </div>
                Check-in: {place.checkIn} <br />
                Check-out: {place.checkOut} <br />
                Max number of guests: {place.maxGuests}
            </div>
            <div>
                <BookingWidget place={place} />
            </div>
        </div>
        <div className="bg-white -m-8  px-8 py-8 ">
        <div>
            <h2 className='font-semibold text-2xl' >Extra Info</h2>
        </div>
        <div className='mb-4 mt-2 text-sm text-gray-700 leading-4' >{place.extraInfo}</div>
        </div>
    </div>
  )
}

export default SinglePage