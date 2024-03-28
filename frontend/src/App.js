import React, { useEffect, useState } from "react";
import ReactMapGL from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import axios from 'axios'
import ShowPins from "./components/showPins";
import CreatePins from "./components/createPins";
import Login from "./components/login";
import Signin from "./components/signin"
import Header from "./components/Header";

const API_GETLOCATION = "https://api.openweathermap.org/data/2.5/weather?";

const API_KEY = "";

function App() {
  const myStorage = window.localStorage;
  const [currentUser, setCurrentUser] = useState('');
  const apiMap = process.env.REACT_APP_MAP;
  const [pins, setPins] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignin, setShowSignin] = useState(false);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState([])
  const [showPopup, setShowPopup] = useState(false);
  const [rating, setRating] = React.useState(0);
  const [newDesc, setNewDesc] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [viewState, setViewState] = useState({
    longitude: -107.991707,
    latitude: 61.066692,
    zoom: 4,
  });

  // location
  useEffect(() => {
    const getLocation = async () => {
      try {
        const response = await axios.get(`${API_GETLOCATION}lat=${newPlace.lat}&lon=${newPlace.long}&appid=${API_KEY}`)
        setNewTitle(response.data.name);
      }
      catch (err) {
        console.log(err)
      }
    }
    getLocation();
  }, [newPlace])

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

  const handleAddPlace = (e) => {
    setNewPlace({
      long: e.lngLat.lng,
      lat: e.lngLat.lat
    })
    setShowPopup(!showPopup);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPlace) return;
    const newPin = {
      username: currentUser,
      title: newTitle,
      desc: newDesc,
      rating: rating,
      lat: newPlace.lat,
      long: newPlace.long,
    }

    console.log(newPin)

    try {
      const response = await axios.post("/pins", newPin);
      setPins([...pins, response.data]);
    } catch (err) {
      console.log(err)
    }

  };

  return (
    <>
      <ReactMapGL
        {...viewState}
        mapboxAccessToken={apiMap}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}
        onDblClick={handleAddPlace}
        transitionDuration="200"
      >
        <Header
          currentUser={currentUser}
          setShowLogin={setShowLogin}
          setShowSignin={setShowSignin}
        />
        {currentUser ? (
          <>
            {pins.map((pin) => (
              <ShowPins
                key={pin._id}
                pin={pin}
                viewState={viewState}
                currentUser={currentUser}
                currentPlaceId={currentPlaceId}
                setCurrentPlaceId={setCurrentPlaceId}
                handleMarkerClick={handleMarkerClick} />
            ))}

            {showPopup && (
              <CreatePins newPlace={newPlace} rating={rating} setRating={setRating} setNewDesc={setNewDesc} setCurrentPlaceId={setCurrentPlaceId} handleSubmit={handleSubmit} />
            )}
          </>
        ) : (
          <>
            {showLogin && <Login setShowLogin={setShowLogin} myStorage={myStorage} setCurrentUser={setCurrentUser} />}
            {showSignin && <Signin setShowSignin={setShowSignin} />}
          </>
        )}

      </ReactMapGL>
    </>
  );
}

export default App;
