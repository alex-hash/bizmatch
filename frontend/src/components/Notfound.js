import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export function notFound(){
    return(
        <div>
            <div class="h-screen w-screen bg-blue-600 flex justify-center flex-wrap content-center">
                <p class="text-4xl sm:text-6xl font-sans text-white error-text">404 Not Found</p>
            </div>

            <div class="absolute w-screen bottom-0 mb-6 text-white text-center font-sans text-xl">
                <span class="opacity-50">Quiero volver a </span>
                <a class="border-b" href="/">bizmatch.com</a>
            </div>
        </div>
    );
}