import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faMapMarkerAlt, faFire } from "@fortawesome/free-solid-svg-icons";
import IMAGES from "../Assets/images";
import "./Style.css";

const allEvents = [
  { id: 1, title: "Summer Sprint Series", date: "Mar 15, 2024", location: "Laguna Seca", tag: "CIRCUIT", featured: true, image: IMAGES.event1 },
  { id: 2, title: "Night Drift Championship", date: "Apr 02, 2024", location: "Suzuka Circuit", tag: "DRIFT", featured: true, image: IMAGES.event2 },
  { id: 3, title: "Endurance Cup 500", date: "Apr 20, 2024", location: "Silverstone", tag: "ENDURANCE", featured: true, image: IMAGES.event3 },
  { id: 4, title: "Street Rally Pro", date: "May 05, 2024", location: "Monaco", tag: "RALLY", image: IMAGES.event4 },
  { id: 5, title: "GT Masters Open", date: "May 18, 2024", location: "Nurburgring", tag: "GT", image: IMAGES.event5 },
  { id: 6, title: "Thunder Lap Challenge", date: "Jun 01, 2024", location: "Brands Hatch", tag: "CIRCUIT", image: IMAGES.event6 },
  { id: 7, title: "Desert Storm Rally", date: "Jun 15, 2024", location: "Dakar Route", tag: "RALLY", image: IMAGES.event7 },
  { id: 8, title: "Supercar Showdown", date: "Jul 04, 2024", location: "Monza", tag: "CIRCUIT", image: IMAGES.event8 },
  { id: 9, title: "Midnight Drag Wars", date: "Jul 20, 2024", location: "Santa Pod", tag: "DRAG", image: IMAGES.event9 },
  { id: 10, title: "Classic Le Mans Revival", date: "Aug 08, 2024", location: "Le Mans", tag: "ENDURANCE", image: IMAGES.event10 },
  { id: 11, title: "Turbo Kart Grand Prix", date: "Aug 25, 2024", location: "Spa", tag: "KART", image: IMAGES.event11 },
  { id: 12, title: "Season Finale Blitz", date: "Sep 10, 2024", location: "Imola", tag: "CIRCUIT", image: IMAGES.event12 },
];

function FeaturedEvents() {
  const [showAll, setShowAll] = useState(false);

  const visibleEvents = showAll ? allEvents : allEvents.slice(0, 3);

  const getTagColor = (tag) => {
    const colors = {
      CIRCUIT: "#E10600",
      DRIFT: "#FF6B35",
      ENDURANCE: "#004E89",
      RALLY: "#F77F00",
      GT: "#06A77D",
      DRAG: "#D00000",
      KART: "#9D4EDD"
    };
    return colors[tag] || "#E10600";
  };

  return (
    <div className="featured-events-section">
      <div className="featured-header">
        <h1 className="featured-title">
          <FontAwesomeIcon icon={faFire} className="fire-icon" />
          Featured Events
        </h1>
        <p className="featured-subtitle">Don't miss out on the biggest racing events of the season</p>
      </div>

      <div className="all-events-grid">
        {visibleEvents.map((evt) => (
          <div className="all-event-card" key={evt.id}>
            <div className="all-event-img-wrapper">
              <img src={evt.image} alt={evt.title} />
              {evt.featured && <div className="badge-top badge-featured">⭐ FEATURED</div>}
              <div className="badge-top badge-circuit" style={{ backgroundColor: getTagColor(evt.tag) }}>
                {evt.tag}
              </div>
            </div>
            
            <div className="all-event-info">
              <h3 className="all-event-title">{evt.title}</h3>
              
              <div className="event-meta">
                <div className="meta-item">
                  <FontAwesomeIcon icon={faCalendar} className="meta-icon" />
                  <span className="all-event-date">{evt.date}</span>
                </div>
                <div className="meta-item">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="meta-icon" />
                  <span className="all-event-location">{evt.location}</span>
                </div>
              </div>
              
              <Link to={`/events/${evt.id}/register`} className="all-event-btn">
                REGISTER NOW
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="events-button-wrapper">
        <button className="view-btn" onClick={() => setShowAll(!showAll)}>
          {showAll ? "← SHOW LESS EVENTS" : "VIEW ALL EVENTS →"}
        </button>
      </div>
    </div>
  );
}

export default FeaturedEvents;
