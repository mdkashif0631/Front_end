import React from 'react';
import './PropertyCardTemplate.css';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaHome, FaRupeeSign } from 'react-icons/fa';
import { FaBed } from "react-icons/fa6";
import { BiSolidArea } from "react-icons/bi";
// import { Link } from 'react-router-dom';

// Define the backend base URL for image path
const BASE_URL = process.env.REACT_APP_API_URL;


// Slugify function to convert propertyect name to URL-friendly slug
const slugify = (name) => {
  return name?.toLowerCase().replace(/s+/g, '-').replace(/[^a-z0-9-]/g, '');
};

const PropertyCardTemplate = ({ property }) => (
  <Card className="cardContainer mb-4">
    <div className='stickerimages' style={{ height: '200px', position: 'relative' }}>
      <Card.Img
        className='h-100 w-100'
        variant="top"
        src={property.Main_Image ? `${BASE_URL}/uploads/${property.Main_Image}` : '/img/placeholder-image.jpg'}
        alt="Property"
        onError={(e) => e.target.src = '/img/placeholder-image.jpg'}
      />
      <div className="reraWrapper">
        <p className="reraTag">RERA No: {property.Our_Rera_Number || "N/A"}</p>
      </div>
      <div className='logoImage'>
        <img
          src={property.Developer_Logo ? `${BASE_URL}/uploads/${property.Developer_Logo}` : '/img/placeholder-logo.png'}
          alt="logo"
          onError={(e) => e.target.src = '../img/elaanlogo.png'}
        />
      </div>
    </div>

    <Card.Body>
      <Card.Title style={{ color: "black", fontSize: "20px" }}>
        {property.Project_Name || "No Name"}
      </Card.Title>
      <Card.Subtitle className="mb-2 text-muted" style={{ fontSize: "12px" }}>
        {property.Localities || property.Location || property.City ?
          `${property.Localities}, ${property.Location}, ${property.City}`.slice(0, 35) + '...'
          : "No Address"}
      </Card.Subtitle>


      <h4 className="text" style={{ color: "black" }}>
        <FaRupeeSign style={{ color: "#2763ff" }}/> {`${property.Start_price / 10000000}Cr - ` || ""}<FaRupeeSign style={{ color: "#2763ff" }} /> {`${property.End_price / 10000000}Cr` || ""}
      </h4>

      {(() => {
        const bhkMap = [
          [property.Beds_2bhk, 2],
          [property.Beds_3bhk, 3],
          [property.Beds_4bhk, 4],
          [property.Beds_5bhk, 5],
        ];

        const bhkValues = bhkMap
          .filter(([value]) => value)  // Keep only non-empty
          .map(([, bhk]) => bhk);      // Extract numbers like 2, 3, 4, etc.

        const hasPenthouse = !!property.Penthouse;

        if (bhkValues.length === 0 && !hasPenthouse) return <p></p>;

        const min = Math.min(...bhkValues);
        const max = Math.max(...bhkValues);

        const bhkText =
          bhkValues.length === 0
            ? ""
            : min === max
              ? `${min} BHK`
              : `${min} BHK - ${max} BHK`;

        const displayText = hasPenthouse
          ? bhkText
            ? `${bhkText} & Penthouse`
            : "Penthouse"
          : bhkText;

        return <p className="mb-1 text-muted" style={{ fontSize: "12px", fontWeight: "600" }}>
          <FaBed style={{ color: "#2763ff", fontSize: "16px" }} />: {displayText}</p>;
      })()}

      {(() => {
          const builtUpMap = [
            property.Built_Up_Area_2bhk,
            property.Built_Up_Area_3bhk,
            property.Built_Up_Area_4bhk,
            property.Built_Up_Area_5bhk,
            property.Built_Up_Area_Penthouse
          ];

          // Filter out empty strings and non-numeric values
          const builtUpValues = builtUpMap
            .filter(area => area && area !== "")
            .map(area => parseFloat(area))
            .filter(area => !isNaN(area));


          const min = Math.min(...builtUpValues);
          const max = Math.max(...builtUpValues);

          const displayBuiltUpArea =
            min === max ? `${min} sq.ft` : `${min} - ${max} sq.ft`;

          return <p className='mb-1 text-muted' style={{ fontSize: "12px", fontWeight: "600" }}>
        <BiSolidArea style={{ color: "#2763ff", fontSize: "16px" }} />:  {displayBuiltUpArea} (Sq.Ft)</p>;
        })()} 

      <p className="mb-1 text-muted" style={{ fontSize: "12px", fontWeight: "600" }}>
        <FaHome style={{ color: "#2763ff", fontSize: "16px" }} />: {property.Built || "N/A"} Acre
      </p>

      <div className="d-flex justify-content-end align-items-center mt-2">
        <span className='viewOfferButton'>
          <a
            href={`/projects/${slugify(property.Project_Name || "propertyect")}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            VIEW OFFER
          </a>
        </span>
      </div>
    </Card.Body>
  </Card>
);

export default PropertyCardTemplate;
