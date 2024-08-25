import React from "react";
import PropTypes from "prop-types";
import "./GridLayout.css";

const GridLayout = ({ items }: any) => {
  return (
    <div className="grid-container">
      {items.map((item: any, index: any) => (
        <div className="grid-item" key={index}>
          <div className="item-header">
            <div className="lecture-name">{item.lectureName}</div>
            <div className="item-icons">
              {item.isLive && <span className="icon">🔴</span>}
              {item.isVideo && <span className="icon">📹</span>}
              {item.handRaised > 0 && (
                <span className="icon">✋ {item.handRaised}</span>
              )}
            </div>
          </div>
          <img src={item.image} alt={item.location} className="item-image" />
          <div className="item-footer">
            <span className="location">{item.location}</span>
            <span className="count">{item.count}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

GridLayout.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      lectureName: PropTypes.string.isRequired,
      isLive: PropTypes.bool,
      isVideo: PropTypes.bool,
      handRaised: PropTypes.number,
      image: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default GridLayout;
