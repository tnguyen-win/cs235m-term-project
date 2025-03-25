import { useLocalSearchParams } from 'expo-router';
import { styles } from '@/app/_layout';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Link } from 'expo-router';

export default function NotFoundScreen() {
    const { error } = useLocalSearchParams();

    return (
        <ThemedView style={styles.notFoundContainer}>
            <ThemedText type='title'>404</ThemedText>
            <ThemedText type='subtitle'>PAGE NOT FOUND</ThemedText>
            <ThemedText style={styles.notFoundErrorText}>
                {error
                    ? error
                    : "The page you're looking for doesn't exist here."}
            </ThemedText>
            <Link href='/'>
                <ThemedText
                    type='link'
                    href='/'>
                    RETURN HOME
                </ThemedText>
            </Link>
        </ThemedView>
    );
}
