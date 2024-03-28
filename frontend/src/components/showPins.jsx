import React from 'react'
import { Marker, Popup } from 'react-map-gl';
import { ImLocation2 } from "react-icons/im";
import { format } from 'timeago.js';
import { FaStar, FaRegStar } from "react-icons/fa"; 
import Rating from 'react-rating';
export default function showPins({ newTitle, pin, currentUser, currentPlaceId, setCurrentPlaceId, viewState, handleMarkerClick }) {
    const handleClick = () => {
        handleMarkerClick(pin._id, pin.lat, pin.long);
    }

  return (
    <div key={pin._id}>
    <Marker longitude={pin.long} latitude={pin.lat} offsetLeft={-20} offsetTop={-10}>
      <ImLocation2
        onClick={handleClick}
        style={{ fontSize: viewState.zoom * 10 }}
        className={currentUser === pin.username ? "text-indigo-600" : "text-orange-600"} />
    </Marker>
    {pin._id === currentPlaceId && (
      <Popup
        longitude={pin.long}
        latitude={pin.lat}
        anchor="left"
        closeButton={true}
        closeOnClick={false}
        onClose={() => setCurrentPlaceId(null)}>
        <div className="w-80">
          <h1 className="inline border-b-2 border-orange-500 pr-5 pb-1 font-montserrat text-base font-semibold">Place</h1>
            
          <p className="mt-2 mb-3 font-montserrat text-lg font-normal">{ newTitle ? pin.title : 'No Location Found' }</p>
          <h1 className="inline border-b-2 border-orange-500 pr-5 pb-1 font-montserrat text-base font-semibold">Review</h1>
          <p className="mt-2 mb-3 font-montserrat text-base font-normal">{pin.desc}</p>
          <h1 className="inline border-b-2 border-orange-500 pr-5 pb-1 font-montserrat text-sm font-semibold">Rating</h1>
            <div className='mt-3'>
            <Rating
            initialRating={pin.rating} // Set the initial rating value
            emptySymbol={<FaRegStar className="text-yellow-500 text-xl" />}
            fullSymbol={<FaStar className="text-yellow-500 text-xl" />}
            readonly // Make the rating readonly, so users can't change it
          />
          </div>
          <div className='flex gap-5 mt-5 justify-between'>
            <p className="font-montserrat text-sm font-semibold capitalize">{pin.username}</p>
            <p className="font-montserrat text-sm font-semibold">{format(pin.createdAt)}</p>
          </div>
        </div>
      </Popup>
    )}


  </div>
  )
}
