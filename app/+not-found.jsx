import { useRouter, useLocalSearchParams } from 'expo-router';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { rootClasses, defaultClasses } from '@/app/_layout';

export default function NotFoundScreen() {
    const router = useRouter();
    const { error } = useLocalSearchParams();
    const handleOnPress = () =>
        router.replace({
            pathname: '(home)'
        });

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
                <TouchableOpacity onPress={handleOnPress}>
                    <Text className={rootClasses.link}>Return Home</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
