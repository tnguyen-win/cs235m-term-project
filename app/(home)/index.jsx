import { useThemeColor } from '@/hooks/useThemeColor';
import { styles, colors } from '@/app/_layout';
import { useState, useEffect } from 'react';
import DummyDataGodot from '@/data/dummy_data_godot.json';
import DummyDataBabylonJS from '@/data/dummy_data_babylonjs.json';
import { useRouter } from 'expo-router';
import {
    View,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import Release from '@/components/Release';

export default function Home() {
    const themedColor = useThemeColor(
        { light: colors.black, dark: colors.white },
        'text'
    );
    // Test fetches by using local JSON files to avoid increasing GitHUB REST API rate limit.
    const mockFetch = false;
    // Inserts default values for form fields for quick testing.
    const mockForms = false;
    // Alternate between pretend repositories.
    const mockReleases = 0;
    const [formOwner, setFormOwner] = useState(
        mockFetch || mockForms
            ? mockReleases === 0
                ? 'godotengine'
                : 'babylonjs'
            : ''
    );
    const [formRepository, setFormRepository] = useState(
        mockFetch || mockForms
            ? mockReleases === 0
                ? 'godot'
                : 'babylon.js'
            : ''
    );
    const [jsonData, setJsonData] = useState(null);
    const fetchInit = async () => {
        try {
            const slicedData = Object.entries(
                mockReleases === 0 ? DummyDataGodot : DummyDataBabylonJS
            ).slice(0, 2);
            const updatedData = slicedData.map((itemRelease, index) => ({
                id: index + 1,
                ...itemRelease
            }));

            setJsonData(updatedData);
        } catch (error) {
            console.error(`Fetch Error: ${error}`);
        }
    };
    const router = useRouter();
    const fetchHeaders = new Headers();

    process.env.EXPO_PUBLIC_GITHUB_ACCESS_TOKEN
        ? fetchHeaders.append(
              'Authorization',
              `Bearer ${process.env.EXPO_PUBLIC_GITHUB_ACCESS_TOKEN}`
          )
        : undefined;

    const handleOnSubmit = () => {
        switch (true) {
            case formOwner === '':
            case formRepository === '':
                router.replace({
                    pathname: '+not-found',
                    params: {
                        error: `One or more form fields were empty:\n• Form Owner: ${
                            formOwner || '[BLANK]'
                        }\n• Form Repository: ${formRepository || '[BLANK]'}`
                    }
                });

                console.log(`formOwner: ${formOwner}`);
                console.log(`formRepository: ${formRepository}`);

                break;
            case formOwner !== '' && formRepository !== '':
                fetch(
                    `https://api.github.com/repos/${formOwner}/${formRepository}/releases`,
                    {
                        headers: fetchHeaders
                    }
                )
                    .then(res =>
                        res.ok
                            ? res.json()
                            : (() => {
                                  router.push({
                                      pathname: '+not-found',
                                      params: {
                                          error: `One or more form fields were invalid:\n• Form Owner: ${
                                              formOwner || '[BLANK]'
                                          }\n• Form Repository: ${
                                              formRepository || '[BLANK]'
                                          }`
                                      }
                                  });

                                  console.log(`Response Status: ${res.status}`);
                                  console.log(`formOwner: ${formOwner}`);
                                  console.log(
                                      `formRepository: ${formRepository}`
                                  );
                              })()
                    )
                    .then(json => setJsonData(json))
                    .catch(err => {
                        router.push({
                            pathname: '+not-found',
                            params: {
                                error: `One or more unknown errors occurred:\n• Form Owner: ${
                                    formOwner || '[BLANK]'
                                }\n• Form Repository: ${
                                    formRepository || '[BLANK]'
                                }`
                            }
                        });

                        console.log(`Error: ${err}`);
                        console.log(`formOwner: ${formOwner}`);
                        console.log(`formRepository: ${formRepository}`);
                    });

                break;
        }

        setFormOwner('');
        setFormRepository('');
    };
    // Source for date diff algorithms - https://javascript.plainenglish.io/find-difference-between-dates-in-javascript-80d9280d8598
    const calculateElapsedTime = date => {
        const diffMonths = (d1, d2) => {
            const date1 = new Date(d1);
            const date2 = new Date(d2);
            const years = diffYears(d1, d2);
            const months =
                years * 12 + (date2.getMonth() - date1.getUTCMonth());

            return months;
        };
        const diffYears = (d1, d2) => {
            const date1 = new Date(d1);
            const date2 = new Date(d2);
            const diffYears = date2.getFullYear() - date1.getFullYear();

            return diffYears;
        };
        const diffWeeks = (d1, d2) => {
            const days = diffDays(d1, d2);
            const diffWeeks = Math.floor(days / 7);

            return diffWeeks;
        };
        const diffDays = (d1, d2) => {
            const hours = diffHours(d1, d2);
            const diffDays = Math.floor(hours / 24);

            return diffDays;
        };
        const diffHours = (d1, d2) => {
            const minutes = diffMinutes(d1, d2);
            const diffHours = Math.floor(minutes / 60);

            return diffHours;
        };
        const diffMinutes = (d1, d2) => {
            const seconds = diffSeconds(d1, d2);
            const diffMinutes = Math.floor(seconds / 60);

            return diffMinutes;
        };
        const diffSeconds = (d1, d2) => {
            const secDiff = Math.floor((d2 - d1) / 1000);

            return secDiff;
        };
        const d1 = new Date(date);
        const d2 = new Date();
        const d3 = d1.toDateString().split(' ');

        return diffYears(d1, d2) > 0
            ? `${d3[1]} ${d3[2]}, ${d3[3]} `
            : diffMonths(d1, d2) > 0
            ? `${d3[1]} ${d3[2]} `
            : diffWeeks(d1, d2) > 0
            ? `${diffWeeks(d1, d2)} weeks ago`
            : diffDays(d1, d2) > 0
            ? `${diffDays(d1, d2)} days ago`
            : diffHours(d1, d2) > 0
            ? `${diffHours(d1, d2)} hours ago`
            : diffMinutes(d1, d2) > 0
            ? `${diffMinutes(d1, d2)} minutes ago`
            : diffSeconds(d1, d2) > 0
            ? `${diffSeconds(d1, d2)} seconds ago`
            : '';
    };
    const getWord = (url, start, end) => {
        const min = url.indexOf(start) + start.length;
        const max = url.indexOf(end, min);

        return url.substring(min, max);
    };

    useEffect(() => {
        mockFetch ? fetchInit() : undefined;

        typeof document !== 'undefined'
            ? (document.title = 'GH Replicate')
            : undefined;
    }, []);

    useEffect(() => {
        console.log(formOwner);
        console.log(formRepository);
    }, [formOwner, formRepository]);

    return (
        <ThemedView style={styles.rootContainer}>
            <ScrollView contentContainerStyle={styles.rootSubContainer}>
                <View style={styles.headingTitleGroup}>
                    <Text
                        style={{
                            color: themedColor,
                            ...styles.headingTitleText
                        }}>
                        GH REPLICATE
                    </Text>
                </View>
                <View style={styles.headingTitleLine} />
                <View style={styles.formGroup}>
                    <ThemedText style={styles.formLabel}>Owner</ThemedText>
                    <TextInput
                        keyboardType='default'
                        onSubmitEditing={handleOnSubmit}
                        value={formOwner}
                        onChangeText={newText => setFormOwner(newText)}
                        autoCorrect={false}
                        spellCheck={false}
                        placeholder='e.g. godotengine'
                        placeholderTextColor={colors.gray}
                        style={{
                            ...styles.formInput,
                            color: themedColor
                        }}
                    />
                </View>
                <View style={styles.formGroup}>
                    <ThemedText style={styles.formLabel}>Repository</ThemedText>
                    <TextInput
                        keyboardType='default'
                        onSubmitEditing={handleOnSubmit}
                        value={formRepository}
                        onChangeText={newText => setFormRepository(newText)}
                        autoCorrect={false}
                        spellCheck={false}
                        placeholder='e.g. godot'
                        placeholderTextColor={colors.gray}
                        style={{
                            ...styles.formInput,
                            color: themedColor
                        }}
                    />
                </View>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={handleOnSubmit}>
                    <Text style={styles.formButtonText}>SUBMIT</Text>
                </TouchableOpacity>
                <View style={styles.releasesContainer}>
                    {jsonData
                        ? jsonData.map(res => {
                              const id = res.id.toString();
                              const githubOwner = getWord(
                                  res.url,
                                  'repos/',
                                  '/'
                              );
                              const githubRepository = getWord(
                                  res.url,
                                  `${githubOwner}/`,
                                  '/'
                              );

                              mockFetch ? (res = res[1]) : undefined;

                              return (
                                  <Release
                                      key={id}
                                      themedColor={themedColor}
                                      date={calculateElapsedTime(
                                          res.created_at
                                      )}
                                      authorImg={res.author.avatar_url}
                                      authorBody={res.author.login}
                                      tagLink={`https://github.com/${githubOwner}/${githubRepository}/tree/${res.tag_name}`}
                                      tagBody={res.tag_name}
                                      titleLink={res.html_url}
                                      titleText={res.tag_name}
                                      latestLink={
                                          id === '1'
                                              ? `https://github.com/${githubOwner}/${githubRepository}/releases/latest`
                                              : undefined
                                      }
                                      changelog={res.body}
                                      downloadableLength={res.assets.length + 2}
                                      downloadableLinks={res.assets}
                                      downloadAbleZipBall={res.zipball_url}
                                      downloadAbleTarBall={res.tarball_url}
                                  />
                              );
                          })
                        : undefined}
                </View>
            </ScrollView>
        </ThemedView>
    );
}
