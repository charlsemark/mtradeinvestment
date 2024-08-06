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
    <div ref={googleTranslateRef}></div>
  )
}

export default LanguageTranslate