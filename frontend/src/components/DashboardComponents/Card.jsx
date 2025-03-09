import React from "react";
import { Link } from "react-router-dom";

const Card = ({ title, photo, description,buttonname,link="" }) => {
  return (
    <Link to={link}>
    <div className="card bg-base-300 w-56 shadow-sm hover:cursor-pointer ">
      <figure className=" p-2 rounded-4xl">
        <img className="h-40" src={photo} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
       
      </div>
    </div>
    </Link>
  );
};

export default Card;
