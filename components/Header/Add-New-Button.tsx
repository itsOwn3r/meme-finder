"use client";
import React, { useEffect } from 'react'
import Button from '../Button/Button'

const AddNewButton = () => {
    useEffect(() => {
    if ("serviceWorker" in navigator) {
        // Register a service worker hosted at the root of the
        // site using the default scope.
        navigator.serviceWorker.register("/sw-custom.js").then(
          (registration) => {
            console.log("Service worker registration succeeded:", registration);
          },
          (error) => {
            console.error(`Service worker registration failed: ${error}`);
          },
        );
      } else {
        console.error("Service workers are not supported.");
      }
    }
    )
  return (
    <div className="flex items-center gap-x-8">
    <Button href="/new">Add a New Meme</Button>
  </div>
  )
}

export default AddNewButton