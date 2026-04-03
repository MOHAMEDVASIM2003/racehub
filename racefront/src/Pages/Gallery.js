import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons";
import IMAGES from "../Assets/images";
import "./Style.css";

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [category, setCategory] = useState("all");

  const galleryItems = [
    { id: 1, title: "High-Speed Chase", image: IMAGES.car1, category: "racing", year: "2024" },
    { id: 2, title: "Track Precision", image: IMAGES.car2, category: "racing", year: "2024" },
    { id: 3, title: "Drift Mastery", image: IMAGES.car3, category: "drift", year: "2024" },
    { id: 4, title: "Victory Lane", image: IMAGES.event1, category: "racing", year: "2024" },
    { id: 5, title: "Night Racing", image: IMAGES.event2, category: "racing", year: "2024" },
    { id: 6, title: "Pit Crew Action", image: IMAGES.event3, category: "pit", year: "2024" },
    { id: 7, title: "Driver Focus", image: IMAGES.event4, category: "drivers", year: "2024" },
    { id: 8, title: "Championship Moment", image: IMAGES.event5, category: "racing", year: "2024" },
  ];

  const categories = [
    { id: "all", label: "All Media" },
    { id: "racing", label: "Racing" },
    { id: "drift", label: "Drift" },
    { id: "pit", label: "Pit Crew" },
    { id: "drivers", label: "Drivers" },
  ];

  const filteredItems = category === "all" ? galleryItems : galleryItems.filter(item => item.category === category);

  return (
    <div className="gallery-section">
      <div className="gallery-header">
        <h2 className="gallery-title">Event Gallery</h2>
        <p className="gallery-subtitle">Witness the excitement and passion of our racing events</p>
      </div>

      {/* Category Filter */}
      <div className="gallery-filters">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`filter-btn ${category === cat.id ? 'active' : ''}`}
            onClick={() => setCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="gallery-grid">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="gallery-item"
            onClick={() => setSelectedImage(item)}
          >
            <div className="gallery-image-wrapper">
              <img src={item.image} alt={item.title} className="gallery-image" />
              <div className="gallery-overlay">
                <FontAwesomeIcon icon={faMagnifyingGlassPlus} className="zoom-icon" />
              </div>
            </div>
            <div className="gallery-info">
              <h4 className="gallery-item-title">{item.title}</h4>
              <p className="gallery-item-year">{item.year}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setSelectedImage(null)}>×</button>
            <img src={selectedImage.image} alt={selectedImage.title} className="lightbox-image" />
            <div className="lightbox-info">
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.year}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;
