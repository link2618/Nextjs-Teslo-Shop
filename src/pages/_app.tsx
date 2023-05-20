import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { lightTheme } from "@/themes";
import { UiProvider, CartProvider } from "@/context";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
    const [showChild, setShowChild] = useState(false);

    useEffect(() => {
        setShowChild(true);
    }, []);
    
    if (!showChild) {
        return <></>;
    }

    return (
        <SWRConfig
            value={{
                fetcher: (resource, init) =>
                    fetch(resource, init).then((res) => res.json()),
            }}
        >
            <CartProvider>
                <UiProvider>
                    <ThemeProvider theme={lightTheme}>
                        <CssBaseline />
                        <Component {...pageProps} />
                    </ThemeProvider>
                </UiProvider>
            </CartProvider>
        </SWRConfig>
    );
}
