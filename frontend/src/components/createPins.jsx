import React from 'react'
import { Popup } from 'react-map-gl';
import Rating from 'react-rating';
import { FaStar, FaRegStar } from "react-icons/fa"; 
export default function createPins({ newPlace, rating, setRating, setNewDesc, handleSubmit, setCurrentPlaceId }) {
  if (!newPlace) return null;  
  return (
      <Popup
      latitude={newPlace.lat}
            longitude={newPlace.long}
            anchor="left"
            closeButton={true}
            closeOnClick={false}
            onClose={() => setCurrentPlaceId(null)}
          >
            <form onSubmit={handleSubmit} className="bg-white h-auto w-80">
              {/* Rating */}
              <div className="mb-4">
                <label className="border-b-2 border-orange-500 pr-3 pb-1 text-gray-700 text-sm font-bold mb-2 font-montserrat" for="username">
                  Rating 
                </label>
                <div className="mt-3">
                  <Rating
                    emptySymbol={<FaRegStar className="text-yellow-500 text-xl" />}
                    fullSymbol={<FaStar className="text-yellow-500 text-xl" />}
                    onChange={(value) => setRating(value)}
                  />
                  <>{rating}</>
                </div>
              </div>
              {/* Description */}
              <div className="mb-4">
                <label className="border-b-2 border-orange-500 pr-3 pb-1 inline text-gray-700 text-sm font-bold mb-2 font-montserrat" for="username">
                  Description
                </label>
                <textarea onChange={(e) => setNewDesc(e.target.value)} className="mt-3 border rounded w-full py-2 px-3 text-gray-700 font-montserrat focus:outline-none" id="description" type="text" placeholder="Description"></textarea>
              </div>
              <button type="submit" className="w-1/2 py-1 text-base font-montserrat bg-orange-500 text-white rounded-lg font-medium">Submit</button>
            </form>
          </Popup>
  )
}
