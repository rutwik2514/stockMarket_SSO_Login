import React from 'react'

const Spinner = ({ color }) => (
    <div className="spinner-grow" style={{ color }} role="status">
        <span className="visually-hidden">Loading...</span>
    </div>
);
function Loader() {
    const colors = [
        "#800080", // Dark Purple
        "#8a2be2", // Blue Violet
        "#9370db", // Medium Purple
        "#ba55d3", // Medium Orchid
        "#dda0dd", // Plum
        "#e6a8d7", // Pale Violet Red Light
        "#f0b0d1", // Thistle
        "#f9b8cb"  // Very Light Purple
    ];
    return (
        <div>
            {colors.map((color, index) => (
                <Spinner key={index} color={color} />
            ))}
        </div>
    );
}

export default Loader