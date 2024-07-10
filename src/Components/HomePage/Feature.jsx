import React from 'react';
import "./Feature.css"
const Feature = ({ title, text }) => (
    <div className="features-container__feature">
        <div className="features-container__feature-title">
            <div />
            <h5>{title}</h5>
        </div>
        <div className="features-container_feature-text">
            <p>{text}</p>
        </div>
    </div>
);

export default Feature;