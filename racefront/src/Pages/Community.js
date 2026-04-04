import React from "react";
import { Link } from "react-router-dom";
import IMAGES from "../Assets/images";
import "./Style.css";

function Community() {
  const communityMembers = [
    {
      id: 1,
      name: "Mike Drift",
      badge: "PRO",
      wins: 8,
      image: IMAGES.profile1
    },
    {
      id: 2,
      name: "Sarah Speed",
      badge: "PRO",
      wins: 12,
      image: IMAGES.profile2
    },
    {
      id: 3,
      name: "Alex Thunder",
      badge: "ELITE",
      wins: 15,
      image: IMAGES.profile3
    }
  ];

  return (
    <div className="community-section">
      <div className="community-cards-wrapper">
        <div className="community-cards-grid">
          {communityMembers.map((member) => (
            <div key={member.id} className="community-card">
              <div className="card-image-wrapper">
                <img src={member.image} alt={member.name} className="card-image" />
                <div className="card-overlay"></div>
              </div>
              <div className="card-content">
                <h3 className="card-name">{member.name}</h3>
                <div className="card-badge" data-type={member.badge.toLowerCase()}>
                  {member.badge}
                </div>
                <div className="card-wins">
                  <span className="wins-icon">🏆</span>
                  <span className="wins-text">{member.wins} Race Wins</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="community-cta">
        <Link to="/community/join" className="cta-button">
          Join the Community
        </Link>
      </div>
    </div>
  );
}

export default Community;
