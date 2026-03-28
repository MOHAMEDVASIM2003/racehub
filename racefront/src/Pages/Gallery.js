import React from "react";
import IMAGES from "../Assets/images";
import "./Style.css";
function Gallery() {
  return (
    <div className="pic-box">
      <div className="pic1">
        <img src={IMAGES.car1} alt="car1" />
      </div>
      <div className="pic-box2">
        <div className="pic2">
          <img src={IMAGES.car2} alt="car2" />
        </div>
        <div className="pic3">
          <img src={IMAGES.car3} alt="car3" />
        </div>
      </div>
    </div>
  );
}

export default Gallery;
