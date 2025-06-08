import { rootClasses, defaultClasses, colors } from '@/app/_layout';
import { View, Text, TextInput } from 'react-native';

export default function FormInput({
    textLabel,
    textPlaceholder,
    onSubmit,
    onChangeText,
    value
}) {
    return (
        <View className='gap-2'>
            <Text className={defaultClasses.textLabel}>{textLabel}</Text>
            <TextInput
                className={`${rootClasses.backgroundSecondary} ${defaultClasses.formInput}`}
                keyboardType='url'
                onSubmitEditing={onSubmit}
                onChangeText={onChangeText}
                value={value}
                allowFontScaling={false}
                autoCapitalize='none'
                autoCorrect={false}
                spellCheck={false}
                importantForAutofill='no'
                placeholder={textPlaceholder}
                placeholderTextColor={colors.gray}
            />
        </View>
    );
}
