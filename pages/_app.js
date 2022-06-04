import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {CacheProvider} from '@emotion/react';
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';
import "../src/global.css";
import createCache from "@emotion/cache";
import {prefixer} from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Provider} from 'react-redux';
import {ExpenseProvider} from '../context/context';

import store from "../store";
import {AuthProvider} from "../context/AuthContext";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export const muiCache = createCache({
    key: 'mui',
    prepend: true,
});

const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
    prepend: true,
});

export default function MyApp(props) {
    const {
        Component,
        emotionCache = clientSideEmotionCache,
        pageProps
    } = props;

    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <meta
                    name="viewport"
                    content="initial-scale=1, width=device-width"/>
            </Head>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline/>
                <AuthProvider>
                    <ExpenseProvider>
                        <Provider store={store}>
                            <CacheProvider value={muiCache}>
                                <CacheProvider value={cacheRtl}>
                                    <Component {...pageProps} />
                                </CacheProvider>
                            </CacheProvider>
                        </Provider>
                    </ExpenseProvider>
                </AuthProvider>
                <ToastContainer autoClose={3000}/>
            </ThemeProvider>
        </CacheProvider>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    emotionCache: PropTypes.object,
    pageProps: PropTypes.object.isRequired,
};
