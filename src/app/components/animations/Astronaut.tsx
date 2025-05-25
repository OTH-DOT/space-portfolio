'use client';

import Lottie from "lottie-react";
import animationData from "../../../../public/astronaut.json";

const Astronaut = () => {
  return <Lottie animationData={animationData} loop={true} />;
};

export default Astronaut;