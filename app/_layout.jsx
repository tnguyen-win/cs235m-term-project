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
// INFO - Template literals in "className" attributes don't work with arbitrary values in Nativewind.
export const rootClasses = {
    text: 'font-geist text-black dark:text-white',
    link: 'font-geist text-blue-500 hover:text-blue-400',
    backgroundPrimary: 'bg-white dark:bg-[#0a0a0a] p-0 md:p-4',
    backgroundSecondary: 'bg-white dark:bg-[#171717]',
    border: 'border border-zinc-200 dark:border-[#2e2e2e]'
};
// WORKAROUND - Font inheritance doesn't work in Nativewind.
export const defaultClasses = {
    textTitle: `font-black text-center ${rootClasses.text} text-4xl md:text-6xl mb-8`,
    textSubtitle: `font-black text-center ${rootClasses.text} text-2xl md:text-3xl md:m-0`,
    textLabel: `font-semibold ${rootClasses.text}`,
    textTheme: `font-semibold ${rootClasses.text}`,
    formInput: `${rootClasses.text} ${rootClasses.border} rounded-md p-2`,
    releaseTitle: `font-black ${rootClasses.text} text-4xl hover:text-blue-500 hover:dark:text-blue-500 hover:underline hover:dark:underline p-py px-1`
};

SplashScreen.preventAutoHideAsync();

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
