import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const Home = () => {
  const [cookieValue, setCookieValue] = useState('');

  useEffect(() => {
    // Function to update cookie value and state
    const updateCookieValue = () => {
      const existingCookieValue = Cookies.get('myCookie');
      setCookieValue(existingCookieValue || '');
    };

    // Initial update on component mount
    updateCookieValue();

    // Set up an interval to check for changes in the cookie value
    const intervalId = setInterval(updateCookieValue, 1000); // Adjust the interval as needed

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleSetCookie = () => {
    const newValue = 'HelloCookie!';
    Cookies.set('myCookie', newValue);
    setCookieValue(newValue);
  };

  const handleDeleteCookie = () => {
    // Remove the cookie by its key
    Cookies.set('myCookie',"");

    // Update state with an empty value
    setCookieValue('');
  };

  return (
    <div className="container mx-auto mt-8 text-center">
      <p className="text-lg font-semibold mb-4">Cookie Value: {cookieValue}</p>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mr-2"
        onClick={handleSetCookie}
      >
        Set Cookie
      </button>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded"
        onClick={handleDeleteCookie}
      >
        Delete Cookie
      </button>
    </div>
  );
};

export default Home;
