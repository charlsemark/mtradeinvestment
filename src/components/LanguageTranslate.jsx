'use client'
import React, { useEffect, useRef } from 'react'

const LanguageTranslate = () => {
    const googleTranslateRef = useRef(null);

    useEffect(() => {
        let intervalId;
        const checkGoogleTranslate = () => {
            if(window.google && window.google.translate) {
                console.log(intervalId)
                clearInterval(intervalId);
                new window.google.translate.TranslateElement(
                    {pageLanguage: 'en', layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE },
                    googleTranslateRef.current
                );
            }
        };
        intervalId = setInterval(checkGoogleTranslate, 100);
    }, []);
  return (
    <div ref={googleTranslateRef} className='bg-white fixed z-50 right-0 left-0 top-0'></div>
  )
}

export default LanguageTranslate