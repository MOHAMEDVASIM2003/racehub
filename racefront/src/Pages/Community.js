import React from "react";
import { Link } from "react-router-dom";
import IMAGES from "../Assets/images";
import "./Style.css";
function Community() {
  return (
    <div className="gear">
      <div className="communitytxt">
      <h1>Community Spotlight</h1>
      </div>
      <div className="card-container">
        <div className="card">
          <img src={IMAGES.profile1} alt="Mike Drift" />
          <h3>Mike Drift</h3>
          <div className="badge">PRO</div>
          <div className="wins">8 Race Wins</div>
        </div>

        <div className="card">
          <img src={IMAGES.profile2} alt="Mike Drift" />
          <h3>Mike Drift</h3>
          <div className="badge">PRO</div>
          <div className="wins">8 Race Wins</div>
        </div>

        <div className="card">
          <img src={IMAGES.profile3} alt="Mike Drift" />
          <h3>Mike Drift</h3>
          <div className="badge">PRO</div>
          <div className="wins">8 Race Wins</div>
        </div>
      </div>

      <center>
        <Link to="/community/join" className="join-btn">Join the Community</Link>
      </center>
    </div>
  );
}

export default Community;
