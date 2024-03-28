import React from 'react'
import { Marker, Popup } from 'react-map-gl';
import { ImLocation2 } from "react-icons/im";
import { format } from 'timeago.js';
import { FaStar } from "react-icons/fa";

export default function showPins({ pin, currentUser, currentPlaceId, setCurrentPlaceId, viewState, handleMarkerClick }) {
    const handleClick = () => {
        handleMarkerClick(pin._id, pin.lat, pin.long);
    }
  console.log(pin)

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
          <p className="mt-2 mb-3 font-montserrat text-lg font-normal">{pin.title}</p>
          <h1 className="inline border-b-2 border-orange-500 pr-5 pb-1 font-montserrat text-base font-semibold">Review</h1>
          <p className="mt-2 mb-3 font-montserrat text-base font-normal">{pin.desc}</p>
          <h1 className="inline border-b-2 border-orange-500 pr-5 pb-1 font-montserrat text-sm font-semibold">Rating</h1>
          <div className="flex gap-1 mt-5">
            <FaStar className="text-yellow-500 text-lg" />
            <FaStar className="text-yellow-500 text-lg" />
            <FaStar className="text-yellow-500 text-lg" />
            <FaStar className="text-yellow-500 text-lg" />
            <FaStar className="text-yellow-500 text-lg" />
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
