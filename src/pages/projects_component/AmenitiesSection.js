import React from 'react';
import './AmenitiesSection.css'; // Optional styling

const featureEmojiMap = {
  "Gated Community": "🔒",
  "IGBC Certified Green Building": "🌿",
  "Earthquake-Resistant Structure": "🏢",
  "Premium Location Advantage": "📍",
  "Signature Clubhouse": "🏛️",
  "High-Speed Elevators": "⬆️",
  "Grand Entrance Lobby": "🚪",
  "Smart Home Automation": "📲",
  "Designed by Renowned Architects": "✏️",
  "Double-Height Lobby": "🏢",
  "Concierge Services": "🧑‍💼",
  "Valet Parking": "🚗",
  "Separate Service Lifts": "🛗",
  "Basement Parking": "🅿️",
  "EV Charging Stations": "🔌",
  "3-Tier Security System": "🛡️",
  "CCTV Surveillance": "📹",
  "Video Door Phone": "📞",
  "Boom Barrier Entry/Exit": "🚧",
  "Access Card Entry to Towers": "🔑",
  "Fire Detection and Sprinkler System": "🔥",
  "Landscaped Central Greens": "🌼",
  "Jogging Track": "🏃",
  "Water Features & Fountains": "⛲",
  "Outdoor Gym": "🏋️",
  "Kids' Play Area": "👶",
  "Pet Zone": "🐶",
  "Amphitheatre": "🎭",
  "Yoga & Meditation Lawn": "🧘",
  "Swimming Pool": "🏊",
  "Kids Pool": "👧",
  "Indoor Gymnasium": "🏋️‍♂️",
  "Spa & Sauna": "🧖",
  "Mini Theatre": "🎬",
  "Multipurpose Hall": "🏟️",
  "Indoor Games Room": "🎮",
  "Co-Working Lounge": "💼",
  "VRV/VRF Air Conditioning": "💨",
  "Modular Kitchen with Appliances": "🍽️",
  "Italian Marble Flooring in Living/Dining": "🧱",
  "Wooden Flooring in Bedrooms": "🪵",
  "Branded Fittings & Fixtures": "🛠️",
  "False Ceiling with LED Lighting": "💡",
  "Spacious Balconies": "🧱",
  "Walk-In Wardrobes": "👗",
  "Grocery Store / Convenience Store": "🛒",
  "Malls": "🏬",
  "Cafeteria / Coffee Lounge": "☕",
  "Business Center / Conference Room": "📊",
  "Laundry Services": "🧺",
  "ATM/Banking Kiosk": "🏧",
  "Daycare / Crèche Facility": "👶",
  "Close to Reputed Schools": "🏫",
  "Close to Reputed Universitys": "🎓",
  "Near Major Hospitals": "🏥",
  "Walking Distance from Metro Station": "🚇"
};

const AmenitiesSection = ({ project }) => {
  let amenities = project?.Amenities;

  // 📦 Debug info (optional)
  console.log("📦 Raw Amenities:", amenities);

  // 🛠️ Try to parse if stringified
  if (Array.isArray(amenities) && typeof amenities[0] === 'string') {
    try {
      amenities = JSON.parse(amenities[0]);
    } catch (err) {
      console.warn("⚠️ Failed to parse amenities[0]:", err);
      amenities = [];
    }
  } else if (typeof amenities === 'string') {
    try {
      amenities = JSON.parse(amenities);
    } catch (err) {
      console.warn("⚠️ Failed to parse amenities string:", err);
      amenities = [];
    }
  }

  // 🚫 If still invalid or empty
  if (!Array.isArray(amenities) || amenities.length === 0) {
    return <p>ℹ️ No amenities available.</p>;
  }

  return (
    <div className="amenities-container">
      {/* <h2 className="amenities-title">🏗️ Amenities</h2> */}

      {amenities.map((group, idx) => (
        <div key={idx} className="amenities-category">
          <h3 className="category-title">{group.category}</h3>
          <div className="amenities-flex">
            {Array.isArray(group.amenities) &&
              group.amenities.map((feature, i) => (
                <div key={i} className="amenity-item">
                  <span className="amenity-icon">{featureEmojiMap[feature] || "✅"}</span>
                  <span className="amenity-label">{feature}</span>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AmenitiesSection;
