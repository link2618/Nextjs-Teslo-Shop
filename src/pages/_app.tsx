import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { SWRConfig } from 'swr';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { lightTheme } from '@/themes';
import { UiProvider, CartProvider, AuthProvider } from '@/context';

import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
    const [showChild, setShowChild] = useState(false);

    useEffect(() => {
        setShowChild(true);
    }, []);

    if (!showChild) {
        return <></>;
    }

    return (
        <SessionProvider>
            <SWRConfig
                value={{
                    fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
                }}
            >
                <AuthProvider>
                    <CartProvider>
                        <UiProvider>
                            <ThemeProvider theme={lightTheme}>
                                <CssBaseline />
                                <Component {...pageProps} />
                            </ThemeProvider>
                        </UiProvider>
                    </CartProvider>
                </AuthProvider>
            </SWRConfig>
        </SessionProvider>
    );
}
