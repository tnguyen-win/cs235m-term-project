import { useColorScheme } from '@/hooks/useColorScheme';
import { styles as externalStyles } from '@/components/ThemedText';
import { StyleSheet } from 'react-native';
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider
} from '@react-navigation/native';
import { Stack } from 'expo-router';

export const colors = {
    border: '#495057',
    white: 'white',
    gray: 'gray',
    blue: '#2b7fff',
    green: 'green'
};
const styleButtonText = {
    textAlign: 'center',
    ...externalStyles.defaultSemiBold,
    color: colors.white
};
const styleRoundedLevel = 4;
export const styles = StyleSheet.create({
    notFoundContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        gap: 16
    },
    notFoundErrorText: {
        color: '#ec003f'
    },
    buttonContainer: {
        marginBottom: 48,
        padding: 8,
        width: '100%',
        backgroundColor: colors.blue,
        borderRadius: styleRoundedLevel
    },
    rootContainer: {
        flex: 1
    },
    rootSubContainer: {
        paddingVertical: 64,
        marginHorizontal: 'auto',
        width: '87.5%',
        gap: 16
    },
    headingTitleGroup: {
        gap: 8
    },
    headingTitleText: {
        ...externalStyles.title,
        textAlign: 'center'
    },
    headingTitleLine: {
        width: '100%',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: colors.border
    },
    formGroup: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    formLabel: {
        paddingHorizontal: 8,
        height: '100%',
        alignContent: 'center',
        textAlignVertical: 'center',
        backgroundColor: colors.border,
        color: 'lightgray',
        borderTopLeftRadius: styleRoundedLevel,
        borderBottomLeftRadius: styleRoundedLevel
    },
    formInput: {
        zIndex: 1,
        minWidth: '75%',
        padding: 8,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: colors.border,
        borderTopRightRadius: styleRoundedLevel,
        borderBottomRightRadius: styleRoundedLevel
    },
    formButtonText: {
        ...styleButtonText
    },
    releasesContainer: {
        gap: 64
    },
    releaseContainer: {
        padding: 16,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: colors.border,
        borderRadius: styleRoundedLevel,
        gap: 16
    },
    releaseLT: {
        flexDirection: 'row',
        gap: 16
    },
    releaseRT: {
        gap: 16
    },
    releaseAuthorContainer: {
        flex: 1,
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center'
    },
    releaseAuthorImg: {
        width: 20,
        height: 20
    },
    releaseTagContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4
    },
    releaseTitleContainer: {
        flexDirection: 'row',
        gap: 8
    },
    releaseLatestText: {
        padding: 4,
        fontSize: 12,
        color: colors.green,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: colors.green,
        borderRadius: styleRoundedLevel
    },
    releaseDownloadableLengthText: {
        paddingHorizontal: 4,
        fontSize: 12,
        backgroundColor: colors.border,
        color: 'lightgray',
        borderTopLeftRadius: styleRoundedLevel,
        borderBottomLeftRadius: styleRoundedLevel
    },
    releaseDownloadableLinks: {
        gap: 4,
        padding: 16,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: colors.border,
        borderRadius: styleRoundedLevel
    }
});

export default function RootLayout() {
    const colorScheme = useColorScheme();

    return (
        <ThemeProvider
            value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
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
        </ThemeProvider>
    );
}
