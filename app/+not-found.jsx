import { useLocalSearchParams } from 'expo-router';
import { ScrollView, View, Text } from 'react-native';
import { rootClasses, defaultClasses } from '@/app/_layout';
import { Link } from 'expo-router';

export default function NotFoundScreen() {
    const { error } = useLocalSearchParams();

    return (
        <ScrollView
            className='h-screen bg-white dark:bg-[#09090b]'
            contentContainerStyle={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            <View className='flex-1 items-center justify-center container mx-auto px-4 py-16 lg:px-0 lg:py-16 gap-4'>
                <Text
                    className={defaultClasses.textTitle}
                    type='title'>
                    404
                </Text>
                <Text
                    className={defaultClasses.textSubtitle}
                    type='subtitle'>
                    PAGE NOT FOUND
                </Text>
                <Text className={'font-geist text-rose-600'}>
                    {error
                        ? error
                        : "The page you're looking for doesn't exist here."}
                </Text>
                {/* WORKAROUND - TouchOpacity component and onPress events don't work anymore in latest Expo Go versions in other screens. */}
                <Link
                    className={rootClasses.link}
                    href='(home)'>
                    Return Home
                </Link>
            </View>
        </ScrollView>
    );
}
