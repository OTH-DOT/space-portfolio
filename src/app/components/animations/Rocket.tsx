'use client';

import Lottie from "lottie-react";
import animationData from "../../../../public/rocket.json";

const Rocket = () => {
  return <Lottie animationData={animationData} loop={true} />;
};

export default Rocket;