"use client";
import React, { useEffect } from 'react'
import Button from '../Button/Button'

const AddNewButton = () => {
    useEffect(() => {
      if ("serviceWorker" in navigator) {
        if (navigator.serviceWorker.controller) {
          console.log("Active service worker found, no need to register");
        } else {
          // Register the service worker
          navigator.serviceWorker
            .register("/sw-custom.js", {
              scope: "./"
            })
            .then(function (reg) {
              console.log("Service worker has been registered for scope: " + reg.scope);
            });
        }
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