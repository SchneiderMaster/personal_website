import { firebaseConfig } from './firebase';
import { initializeApp } from 'firebase/app';
import Script from 'next/script';
import "@/styles/globals.css"
import React from 'react';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { Metadata } from 'next';
import React from 'react';

let db;

// Check if window is defined (i.e., if the code is running on the client-side)
if (typeof window !== 'undefined') {
  // Initialize Firebase only on the client-side
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  // If you need analytics, you can initialize it here as well
  // const analytics = getAnalytics(app);

  // You can also initialize other Firebase services here if needed
}

try
{

const res = await getDocs(collection(db, "issues"));

res.forEach((doc) => {
  console.log(doc.data());
});
}
catch{
  console.log("no auth lol")
}

export const metadata: Metadata = {
  title: "Schneider Tempo",
  description: "A time logging website for personal use.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Include other scripts as needed */}
      <Script src="https://apis.google.com/js/platform.js" async defer></Script>
      <meta name="google-signin-client_id" content="911079370304-2u99bp5ef59s8dl16a97gslt5dp7fgpm.apps.googleusercontent.com.apps.googleusercontent.com"></meta>
      <body>{children}</body>
    </html>
  );
}
