import React from 'react';
import "./features.css";

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