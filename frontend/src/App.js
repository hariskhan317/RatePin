import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import { FaStar } from "react-icons/fa";
import { ImLocation2 } from "react-icons/im";
import axios from 'axios'
import { format } from 'timeago.js';

function App() {
  const currentUsername = 'haris001'
  const apiMap = process.env.REACT_APP_MAP;
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [viewState, setViewState] = useState({
    longitude: -107.991707,
    latitude: 61.066692,
    zoom: 4,
  });

  useEffect(() => {
    const getPins = async () => {
      try {
        const response = await axios.get("/pins");
        setPins(response.data)
      } catch (err) {
        console.log(err)
      }
    }

    getPins();
  }, [])

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewState({ ...viewState, latitude: lat, longitude: long });
  };
  console.log(currentPlaceId)
  return (
    <>
      <ReactMapGL
        {...viewState}
        mapboxAccessToken={apiMap}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}
      >
        {pins.map((pin) => (
          <div key={pin._id}>
            <Marker longitude={pin.long} latitude={pin.lat} offsetLeft={-20} offsetTop={-10}>
              <ImLocation2
           onClick={() => handleMarkerClick(pin._id, pin.lat, pin.long)}
                style={{ fontSize: viewState.zoom * 10 }}
                className={currentUsername === pin.username ? "text-red-500" : "text-blue-500"} />
            </Marker>
            {pin._id === currentPlaceId && (
              <Popup
                longitude={pin.long}
                latitude={pin.lat}
                anchor="left"
                closeButton={true}
                closeOnClick={false}
                onClose={() => setCurrentPlaceId(null)}>
                <div className="space-y-3 w-80">
                  <h1 className="font-montserrat text-sm font-semibold">Place</h1>
                  <p className="font-montserrat text-lg font-normal">{pin.title}</p>
                  <h1 className="font-montserrat text-sm font-semibold">Review</h1>
                  <p className="font-montserrat text-lg font-normal">{pin.desc}</p>
                  <div className="flex gap-1">
                    <FaStar className="text-yellow-500 text-base" />
                    <FaStar className="text-yellow-500 text-base" />
                    <FaStar className="text-yellow-500 text-base" />
                    <FaStar className="text-yellow-500 text-base" />
                    <FaStar className="text-yellow-500 text-base" />
                  </div>
                  <p className="font-montserrat text-sm font-semibold">{pin.username}</p>
                  <p className="font-montserrat text-sm font-semibold">{format(pin.createdAt)}</p>
                </div>
              </Popup>
            )}


          </div>
        ))}
      </ReactMapGL>
    </>
  );
}

export default App;
