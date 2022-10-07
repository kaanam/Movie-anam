import React, { useState, useEffect } from "react";
import requests from "../Requests";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

const Main = (props) => {
  const [movies, setMovies] = useState([]);
  const movie = movies[Math.floor(Math.random() * movies.length)];

  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results);
    });
  }, []);

  const navigate= useNavigate();


const ReadMore = (text) => {
  const over= JSON.stringify(text);
    const overview= over.replace(/[^\w\s]/g,"").replace(/(^\s+|\s+$)/g,"").replace(/\s+/g," ").replace("children","");
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {setIsReadMore(!isReadMore)};

  return (
    <p>
      {isReadMore ? overview.slice(0, 150): overview }
      {overview.length > 150 &&
        <span onClick={toggleReadMore} className="text-gray-500 cursor-pointer">
          {isReadMore ? '...read more' : ' ...show less'}
        </span>
      }
    </p>
  )
}

const handleClick=()=>{
  navigate(`/${props.genre}/${movie.id}`)
}


  return (
    <div className="w-full h-[100] md:h-[600px] text-[#FFFDE3]">
      <div className="w-full h-[100vh]">
        <div className="absolute w-full h-[100vh] md:h-[100vh] bg-gradient-to-r from-black">
          {" "}
        </div>
        <img
          className="w-full h-[100vh] md:h-full object-cover"
          src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
        />

        <div className="absolute w-full top-[35%] p-8">
          <h1 className="text-6xl md:text-6xl font-bold">{movie?.title} </h1>

          <p className="w-full sm:max-w-[70%] md:max-w-[70%] lg:max-w-[50%] text-gray-200 text-sm md:text-base mt-2">
              <ReadMore>
                {movie?.overview}
              </ReadMore>
          </p>

          <div className="my-4">
            <button onClick={handleClick} className=" px-6 py-2 rounded-full cursor-pointer bg-red-600 hover:bg-red-400 text-white" >
              WATCH TRAILER
            </button>
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default Main;
