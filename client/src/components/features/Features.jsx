import React from 'react';
import "./features.css";
import "../../index.css";

const FeatureItem = ({ icon, title, description }) => (
  <div className="feature-item">
    <img src={icon} alt={`${title} Icon`} className="feature-icon" />
    <h3 className="feature-item-title">{title}</h3>
    <p>{description}</p>
  </div>
);

function Features({ features }) {
  return (
    <>
      <section className="features">
        <h2 className="sr-only">Features</h2>
        {features.map((feature, index) => (
          <FeatureItem key={index} {...feature} />
        ))}
      </section>
    </>
  );
}

export default Features;