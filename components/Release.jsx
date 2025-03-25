import { styles } from '@/app/_layout';
import { View, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Link } from 'expo-router';
import { SvgXml } from 'react-native-svg';
import Markdown from 'react-native-markdown-display';

export default function Release({
    themedColor,
    date,
    authorImg,
    authorBody,
    tagLink,
    tagBody,
    titleLink,
    titleText,
    latestLink,
    changelog,
    downloadableLength,
    downloadableLinks,
    downloadAbleZipBall,
    downloadAbleTarBall
}) {
    // Full list of supported elements: https://github.com/iamacup/react-native-markdown-display/blob/master/src/lib/renderRules.js
    const rulesMarkdown = {
        textgroup: (node, children, _, _styles) => (
            <ThemedText
                key={node.key}
                style={_styles.textgroup}>
                {children}
            </ThemedText>
        ),
        hr: node => (
            <View
                key={node.key}
                style={styles.headingTitleLine}
            />
        ),
        link: (node, children, _, _styles) => {
            return (
                <ThemedText
                    key={node.key}
                    type='link'
                    href={node.attributes.href}
                    style={_styles.link}>
                    {children}
                </ThemedText>
            );
        }
    };
    const DefaultDownloadLinks = () => {
        return (
            <>
                <ThemedText>
                    <ThemedText
                        type='link'
                        href={downloadAbleZipBall}>
                        Source code (zip)
                    </ThemedText>
                </ThemedText>
                <ThemedText>
                    <ThemedText
                        type='link'
                        href={downloadAbleTarBall}>
                        Source code (tar.gz)
                    </ThemedText>
                </ThemedText>
            </>
        );
    };

    return (
        <View
            key={themedColor}
            style={styles.releaseContainer}>
            <View style={styles.releaseLT}>
                <ThemedText>{date}</ThemedText>
                <View>
                    <View style={styles.releaseAuthorContainer}>
                        <Image
                            source={{ uri: authorImg }}
                            style={styles.releaseAuthorImg}
                        />
                        <Link href={`https://github.com/${authorBody}`}>
                            <ThemedText type='link'>{authorBody}</ThemedText>
                        </Link>
                    </View>
                </View>
                <View>
                    <View style={styles.releaseTagContainer}>
                        <SvgXml
                            xml={`
                            <svg
                                width='20'
                                height='20'
                                viewBox='0 0 20 20'
                                fill='${themedColor}'
                            >
                                <path d='M1 7.775V2.75C1 1.784 1.784 1 2.75 1h5.025c.464 0 .91.184 1.238.513l6.25 6.25a1.75 1.75 0 0 1 0 2.474l-5.026 5.026a1.75 1.75 0 0 1-2.474 0l-6.25-6.25A1.752 1.752 0 0 1 1 7.775Zm1.5 0c0 .066.026.13.073.177l6.25 6.25a.25.25 0 0 0 .354 0l5.025-5.025a.25.25 0 0 0 0-.354l-6.25-6.25a.25.25 0 0 0-.177-.073H2.75a.25.25 0 0 0-.25.25ZM6 5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z'></path>
                            </svg>
                            `}
                        />
                        <Link href={tagLink}>
                            <ThemedText type='link'>{tagBody}</ThemedText>
                        </Link>
                    </View>
                </View>
            </View>
            <View style={styles.releaseRT}>
                <View>
                    <View style={styles.releaseTitleContainer}>
                        <Link href={titleLink}>
                            <ThemedText type='title'>{titleText}</ThemedText>
                        </Link>
                        {latestLink ? (
                            <Link href={latestLink}>
                                <ThemedText
                                    type='link'
                                    style={styles.releaseLatestText}>
                                    Latest
                                </ThemedText>
                            </Link>
                        ) : undefined}
                    </View>
                    <ThemedText key={themedColor}>
                        <Markdown rules={rulesMarkdown}>
                            {changelog ? changelog : ''}
                        </Markdown>
                    </ThemedText>
                </View>
                <View style={styles.releaseDownloadableLinks}>
                    {/* WIP - Add summary & details tags here. */}
                    <ThemedText type='subtitle'>
                        Assets{' '}
                        <ThemedText
                            style={styles.releaseDownloadableLengthText}>
                            {downloadableLength}
                        </ThemedText>
                    </ThemedText>
                    {downloadableLinks.length > 0
                        ? downloadableLinks.map(itemRelease => {
                              const id = itemRelease.id.toString();

                              return (
                                  <ThemedText key={id}>
                                      <ThemedText
                                          key={id}
                                          type='link'
                                          href={
                                              itemRelease.browser_download_url
                                          }>
                                          {itemRelease.name}
                                      </ThemedText>
                                  </ThemedText>
                              );
                          })
                        : undefined}
                    <DefaultDownloadLinks />
                </View>
            </View>
        </View>
    );
}
