"use client";

import { useEffect } from 'react';

export default function FontLoader() {
  useEffect(() => {
    // Create and append Poppins font link
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Create and append Press Start 2P font link
    const link2 = document.createElement('link');
    link2.href = 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap';
    link2.rel = 'stylesheet';
    document.head.appendChild(link2);

    return () => {
      // Cleanup on unmount
      document.head.removeChild(link);
      document.head.removeChild(link2);
    };
  }, []);

  return null;
}