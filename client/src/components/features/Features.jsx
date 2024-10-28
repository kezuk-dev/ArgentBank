import React from 'react';
import "./features.css";
import FeaturesItem from './FeaturesItem.jsx';

function Features({ features }) {
  return (
    <section className="features">
      <h2 className="sr-only">Features</h2>
      {features.map((feature, index) => (
        <FeaturesItem key={index} {...feature} />
      ))}
    </section>
  );
}

export default Features;