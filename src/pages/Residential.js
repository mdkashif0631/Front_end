import { useEffect, useState } from 'react';
import './Residential.css';

import TrendingProperties from './projects_component/TrendingProperties';
import LuxuryProject from './projects_component/LuxuryProject';
import NewLaunch from './projects_component/NewLaunch';
import UpComing from './projects_component/UpComing';

import { FaBed, FaCar, FaHome } from "react-icons/fa";
import { BiSolidArea } from "react-icons/bi";
import { SlGraph } from "react-icons/sl";
import { MdPhotoSizeSelectSmall } from "react-icons/md";
import Footer from '../component/Footer';

const BASE_URL = process.env.REACT_APP_API_URL;

// Helper for image URL
const getImageUrl = (fileName) => fileName ? `${BASE_URL}/uploads/${fileName}` : '';

export default function Residential() {
    const [properties, setProperties] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [paused, setPaused] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch property data
    useEffect(() => {
        fetch(`${BASE_URL}/properties`)
            .then(res => res.json())
            .then(data => {
                const residentialProjects = data.filter(item => item.Project_type === "Residential");
                setProperties(residentialProjects);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching properties:", err);
                setError("Failed to load properties.");
                setLoading(false);
            });
    }, []);

    // Progress bar timer (updates every second)
    useEffect(() => {
        if (!paused && properties.length > 0) {
            const secTimer = setInterval(() => {
                setSeconds(prev => (prev + 1) % 6); // 0 to 5
            }, 1000);
            return () => clearInterval(secTimer);
        }
    }, [paused, properties]);

    // Image slide timer (every 6 seconds)
    useEffect(() => {
        if (!paused && properties.length > 0) {
            const slideTimer = setInterval(() => {
                setActiveIndex(prev => (prev + 1) % properties.length);
                setSeconds(0);
            }, 6000);
            return () => clearInterval(slideTimer);
        }
    }, [paused, properties]);

    const togglePause = () => setPaused(prev => !prev);

    if (loading) return <div>Loading properties...</div>;
    if (error) return <div>{error}</div>;
    if (properties.length === 0) return <div>No residential properties available.</div>;

    const current = properties[activeIndex];

    return (
        <div className='commercial_page'>
            <div className='slogan'>
                <h5>At <span>Realty Korner,</span> we're Redefining Realty and Refining Lifestyles.</h5>
            </div>

            <div className="gallery-container">
                <div className='gallery-main-box'>
                    <div className="main-display">
                        <div className='main-display-img'>
                            <div className="progress-container">
                                <div
                                    className="progress-bar"
                                    style={{ width: `${(seconds / 5) * 100}%` }}
                                ></div>
                            </div>

                            <img
                                src={getImageUrl(current?.Main_Image)}
                                alt={current?.Project_Name || "Project Image"}
                                className="main-image"
                            />

                            <div className="controls">
                                <button onClick={togglePause} className="pause-button">
                                    {paused ? '▶️' : '⏸'}
                                </button>
                            </div>
                        </div>

                        <div className='main-display-info'>
                            <div className="header">
                                <img
                                    src={getImageUrl(current?.Developer_Logo || current?.Logoimg)}
                                    alt="Developer Logo"
                                    className="logo"
                                />
                                <div className='company-project-box'>
                                    <h4 className="project-company">{current?.Developer_Name || 'Developer'}</h4>
                                    <p className="view-projects">View All Projects</p>
                                </div>
                            </div>

                            <h2 className="project-title">{current?.Project_Name}</h2>
                            <p className="location">at {current?.Location} by {current?.Developer_Name}</p>
                            <div className="rera-tag">RERA Verified</div>

                            <div className="price">
                                <h3 className="price-label">₹ </h3>
                                <span className="price-value">
                                    {current?.Start_price && current?.End_price
                                        ? `${current.Start_price / 10000000} - ${current.End_price / 10000000} Cr`
                                        : 'Price on Request'}
                                </span>
                                {/* <span className="onwards">Onwards</span> */}
                            </div>

                            <div className="details">
                                <div className='left_Detail'>
                                    <p><BiSolidArea className='unit_icon' /> : {current?.Super_Area_3bhk || current?.Super_Area_2bhk || 'Area N/A'}</p>
                                    <p><SlGraph className='unit_icon' /> : {current?.Mode || 'New Launch'}</p>
                                    <p><FaHome className='unit_icon' /> : {current?.Possession || 'TBD'}</p>
                                </div>
                                <div className='right_Detail'>
                                    {(() => {
                                        const bhkMap = [
                                            [current.Beds_2bhk, 2],
                                            [current.Beds_3bhk, 3],
                                            [current.Beds_4bhk, 4],
                                            [current.Beds_5bhk, 5],
                                        ];

                                        const bhkValues = bhkMap
                                            .filter(([value]) => value)  
                                            .map(([, bhk]) => bhk);     

                                        const hasPenthouse = !!current.Penthouse;

                                        if (bhkValues.length === 0 && !hasPenthouse) return <h3>N/A</h3>;

                                        const min = Math.min(...bhkValues);
                                        const max = Math.max(...bhkValues);

                                        const bhkText =
                                            bhkValues.length === 0
                                                ? ""
                                                : min === max
                                                    ? `${min} BHK`
                                                    : `${min} - ${max} BHK`;

                                        const displayText = hasPenthouse
                                            ? bhkText
                                                ? `${bhkText} & Penthouse`
                                                : "Penthouse"
                                            : bhkText;

                                        return <p><FaBed className='unit_icon' /> : {displayText}</p>;
                                    })()}
                                    <p><MdPhotoSizeSelectSmall className='unit_icon' /> : {
                                        current?.Carpet_Area_3bhk || current?.Carpet_Area_2bhk || 'Size N/A'
                                    }</p>
                                    <p><FaCar className='unit_icon' /> : {current?.Garages || 'Basement Parking'}</p>
                                </div>
                            </div>


                            <button className="contact-btn">📞 Contact Now</button>
                        </div>
                    </div>

                    <div className="sidebar">
                        {properties.slice(0, 5).map((item, index) => (
                            <div
                                key={item._id || index}
                                className={`thumbnail-wrapper ${index === activeIndex ? 'with-shadow' : ''}`}
                                onClick={() => {
                                    setActiveIndex(index);
                                    setSeconds(0); // Reset progress bar when thumbnail is clicked
                                }}
                            >
                                <img
                                    src={getImageUrl(item.Main_Image)}
                                    alt={item.Project_Name}
                                    className="thumbnail"
                                />
                                <p className="label">{item.Project_Name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div>
                <TrendingProperties />
                <LuxuryProject />
                <NewLaunch />
                <UpComing />
            </div>
            <Footer/>
        </div>
    );
}
