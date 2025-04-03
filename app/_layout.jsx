import '@expo/metro-runtime'; // WORKAROUND - For web: https://github.com/expo/expo/issues/23104#issuecomment-1689566248
import '@/assets/css/global.css';
import { useColorScheme } from 'nativewind';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
export const colors = {
    border: '#495057',
    white: 'white',
    gray: 'gray',
    blue: '#2b7fff',
    green: 'green'
};
/*
    INFO - Template literals in "className" attributes don't work with arbitrary values in Nativewind.

    WIP - Migrate color / style variables to custom TailwindCSS colors.
*/
export const rootClasses = {
    text: 'font-geist text-black dark:text-white',
    link: 'font-geist text-sky-600',
    border: 'border border-zinc-200 dark:border-zinc-800'
};
// WORKAROUND - Font inheritance doesn't work in Nativewind.
export const defaultClasses = {
    textTitle: `font-black text-center ${rootClasses.text} text-4xl lg:text-6xl lg:m-0`,
    textSubtitle: `font-black text-center ${rootClasses.text} text-2xl lg:text-3xl lg:m-0`,
    textLabel: `font-semibold ${rootClasses.text}`,
    textTheme: `font-semibold ${rootClasses.text}`,
    formInput: `flex-1 ${rootClasses.text} ${rootClasses.border} rounded-md p-2`
};

SplashScreen.preventAutoHideAsync();

// WIP - Implement localStorage or equiolvants to "remember" last used theme, post page / screen refresh.
export default function RootLayout() {
    const [loadedFonts, error] = useFonts({
        Geist: require('../assets/fonts/Geist-VariableFont_wght.ttf')
    });
    const { colorScheme: getTheme, setColorScheme: setTheme } =
        useColorScheme();

    useEffect(() => {
        setTheme('dark');

        typeof document !== 'undefined'
            ? (document.title = 'GH Replicate')
            : undefined;
    }, []);

    useEffect(() => {
        error
            ? (() => {
                  throw error;
              })()
            : undefined;
        loadedFonts ? SplashScreen.hideAsync() : undefined;
    }, [loadedFonts, error]);

    return !loadedFonts && !error ? null : (
        <>
            {/* WORKAROUND - For buggy mobile. */}
            <StatusBar
                backgroundColor={
                    getTheme === 'light' ? 'rgb(230,230,230)' : 'rgb(35,35,35)'
                }
                style={getTheme === 'light' ? 'dark' : 'light'}
            />
            <Stack>
                <Stack.Screen
                    name='(home)'
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name='+not-found'
                    options={{
                        headerShown: false
                    }}
                />
            </Stack>
        </>
    );
}
