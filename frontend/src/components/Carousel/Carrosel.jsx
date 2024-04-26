import { useState, useEffect } from 'react';
import img1 from '../../assets/images/cImg1.jpg';
import img2 from '../../assets/images/cImg2.jpg';
import img3 from '../../assets/images/cImg3.jpg';

const images = [img1, img2, img3];

const Carousel = () => {
   const [currentSlide, setCurrentSlide] = useState(0);

   useEffect(() => {
      const interval = setInterval(() => {
         setCurrentSlide(prevSlide =>
            prevSlide === images.length - 1 ? 0 : prevSlide + 1
         );
      }, 3000); // Change slide every 3 seconds

      return () => clearInterval(interval);
   }, []);

   return (
      <div className="flex flex-col items-center">
         <div className="bg-[white] relative w-full " data-carousel="slide">
            {/* Carousel wrapper */}
            <div className="shadow-xl relative h-56 md:h-96 overflow-hidden rounded-lg mx-52 mt-10">
               {/* Items */}
               {images.map((image, index) => (
                  <div
                     key={index}
                     className={`transition-transform duration-500 ease-in-out transform ${
                        currentSlide === index
                           ? 'translate-x-0'
                           : '-translate-x-full'
                     } absolute top-0 left-0 w-full h-full`}>
                     <img
                        src={image}
                        className="absolute w-full h-full object-cover"
                        alt={`Slide ${index + 1}`}
                     />
                  </div>
               ))}
            </div>
         </div>
         <div className="text-2xl align-middle font-bold mt-6">
            Elevate your students&apos; A/L experience. Join our Combined Maths
            learning community!
         </div>
         <div className="align-middle mt-6">
            <p className="text-center">
               Unlock the full potential of your students' A/L journey with our
               innovative Combined Maths learning community.
            </p>
            <p className="text-center">
               Empower them to excel with expert guidance, interactive
               resources, and personalized support.
            </p>
            <p className="text-center">
               Elevate their learning experience and pave the way for academic
               success.
            </p>
         </div>
      </div>
   );
};

export default Carousel;
