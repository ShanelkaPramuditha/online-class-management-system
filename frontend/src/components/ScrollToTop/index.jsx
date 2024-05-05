import { useState } from 'react';

const ScrollToTopButton = () => {
   const [isVisible, setIsVisible] = useState(false);

   // Show button when page starts scrolling
   const toggleVisibility = () => {
      if (window.scrollY > 0) {
         setIsVisible(true);
      } else {
         setIsVisible(false);
      }
   };

   // Scroll to top of the page
   const scrollToTop = () => {
      window.scrollTo({
         top: 0,
         behavior: 'smooth'
      });
   };

   // Add scroll event listener
   window.addEventListener('scroll', toggleVisibility);

   return (
      // Scroll to top button
      <button
         className={`fixed bottom-5 right-4 bg-gray-800 text-white p-2 rounded-full border ${
            isVisible ? 'block' : 'hidden'
         }`}
         onClick={scrollToTop}>
         <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
               strokeLinecap="round"
               strokeLinejoin="round"
               strokeWidth={2}
               d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
         </svg>
      </button>
   );
};

export default ScrollToTopButton;
