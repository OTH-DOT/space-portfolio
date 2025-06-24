'use client';

import Lottie from "lottie-react";
import animationData from "../../../../public/timeZone.json";

const TimeZone = () => {
  return <Lottie animationData={animationData} loop={true} />;
};

export default TimeZone;