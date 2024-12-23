import React, { useState, useEffect } from 'react';
import image1 from "../Photos/image1.webp"
import image2 from "../Photos/image2.webp"
import image3 from "../Photos/image3.webp"
import image4 from "../Photos/image4.webp"
import image5 from "../Photos/image5.webp"

// import './index.css'; // Import the CSS file

const images = [
  image1,image2,image3,image4,image5
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
<>

    {/* <img src={image1} alt="" /> */}
    <div className="relative z-0 mt-2 w-full h-[300px] sm:h-[400px] md:h-[500px]  mx-auto overflow-hidden">
      <div className="relative z-0 w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute z-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img src={image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center p-2 space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 bg-white rounded-full cursor-pointer ${
              index === currentIndex ? 'bg-opacity-100' : 'bg-opacity-50'
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>

    </>
  );
};

export default Slider;
