import { AppProps } from "next/app";
import { useEffect } from "react";
import { app } from "@/app/firebase"; // Assuming `app` is exported from your firebase module

function SchneiderTempo({ Component, pageProps }: AppProps) {
    useEffect(() => {
        // Firebase initialization
        // No need to initialize Firebase explicitly as it's already initialized in the imported module
    }, []);

    return <Component {...pageProps} />;
}

export default SchneiderTempo;
