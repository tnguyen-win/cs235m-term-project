import { defaultClasses, rootClasses } from '@/app/_layout';
import { Text, View, Platform, Image } from 'react-native';
import { Link } from 'expo-router';
import { SvgXml } from 'react-native-svg';
import Markdown from 'react-native-markdown-display';
import hasParents from 'react-native-markdown-display/src/lib/util/hasParents';

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
    // INFO - Default styles: https://github.com/iamacup/react-native-markdown-display/blob/master/src/lib/styles.js
    const stylesMarkdown = {
        link: {}
    };
    // INFO - Supported elements: https://github.com/iamacup/react-native-markdown-display/blob/master/src/lib/renderRules.js
    const rulesMarkdown = {
        body: (node, children, _, styles) => (
            <View
                key={node.key}
                className='gap-2'
                style={styles._VIEW_SAFE_body}>
                {children}
            </View>
        ),
        textgroup: (node, children, _, _styles) => (
            <Text
                className={rootClasses.text}
                key={node.key}
                style={(_styles.textgroup, { fontFamily: 'Geist' })}>
                {children}
            </Text>
        ),
        hr: node => (
            <View
                key={node.key}
                className={rootClasses.border}
            />
        ),
        list_item: (node, children, parent, styles) => {
            const modifiedInheritedStylesObj = rootClasses.text;

            return hasParents(parent, 'bullet_list') ? (
                <View
                    key={node.key}
                    style={styles._VIEW_SAFE_list_item}>
                    <Text
                        className={modifiedInheritedStylesObj}
                        style={styles.bullet_list_icon}
                        accessible={false}>
                        {Platform.select({
                            android: '\u2022',
                            ios: '\u00B7',
                            default: '\u2022'
                        })}
                    </Text>
                    <View style={styles._VIEW_SAFE_bullet_list_content}>
                        {children}
                    </View>
                </View>
            ) : hasParents(parent, 'ordered_list') ? (
                (() => {
                    const orderedListIndex = parent.findIndex(
                        el => el.type === 'ordered_list'
                    );
                    const orderedList = parent[orderedListIndex];
                    const listItemNumber = orderedList.attributes?.start
                        ? orderedList.attributes.start + node.index
                        : node.index + 1;

                    return (
                        <View
                            key={node.key}
                            style={styles._VIEW_SAFE_list_item}>
                            <Text
                                className={modifiedInheritedStylesObj}
                                style={[styles.ordered_list_icon]}>
                                {listItemNumber}
                                {node.markup}
                            </Text>
                            <View
                                style={styles._VIEW_SAFE_ordered_list_content}>
                                {children}
                            </View>
                        </View>
                    );
                })()
            ) : (
                <View
                    key={node.key}
                    style={styles._VIEW_SAFE_list_item}>
                    {children}
                </View>
            );
        },
        link: (node, children, _, _styles) => (
            <Link
                key={node.key}
                className={rootClasses.link}
                style={_styles.link}
                href={node.attributes.href}>
                {children}
            </Link>
        )
    };
    // // INFO - Disclaimer, this REGEX was constructed using artificial intelligence.
    const matches = changelog?.match(
        / https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}(\/[\w\-./…]*)?/g
    );

    matches
        ? matches?.map(e => {
              e = e.trim();

              changelog = changelog?.replaceAll(e, ` [${e}](${e})`);
          })
        : changelog;

    return (
        <View className={`xl:flex-row gap-8${latestLink ? '' : ' mt-8'}`}>
            {/* INFO - Left row. */}
            <View className='flex-row md:flex-col items-center md:items-start justify-center md:justify-start gap-4 md:gap-2 md:mt-8'>
                <Text className={rootClasses.text}>{date}</Text>
                <View className='flex-row items-center gap-2 md:mt-2'>
                    <Image
                        className='w-[20px] h-[20px]'
                        source={{ uri: authorImg }}
                    />
                    <Link
                        className={`${rootClasses.link} md:mb-1`}
                        href={`https://github.com/${authorBody}`}>
                        {authorBody}
                    </Link>
                </View>
                <View className='flex-row items-center gap-1'>
                    <Link
                        className={rootClasses.link}
                        href={tagLink}>
                        <SvgXml
                            xml={`
                            <svg
                                width='20'
                                height='20'
                                viewBox='0 0 20 20'
                                fill='${
                                    themedColor === 'light' ? 'black' : 'white'
                                }'
                            >
                                <path d='M1 7.775V2.75C1 1.784 1.784 1 2.75 1h5.025c.464 0 .91.184 1.238.513l6.25 6.25a1.75 1.75 0 0 1 0 2.474l-5.026 5.026a1.75 1.75 0 0 1-2.474 0l-6.25-6.25A1.752 1.752 0 0 1 1 7.775Zm1.5 0c0 .066.026.13.073.177l6.25 6.25a.25.25 0 0 0 .354 0l5.025-5.025a.25.25 0 0 0 0-.354l-6.25-6.25a.25.25 0 0 0-.177-.073H2.75a.25.25 0 0 0-.25.25ZM6 5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z'></path>
                            </svg>
                            `}
                        />
                    </Link>
                    <Link
                        className={rootClasses.link}
                        href={tagLink}>
                        {tagBody}
                    </Link>
                </View>
            </View>
            {/* INFO - Right row. */}
            <View
                className={`flex-1 gap-4 ${rootClasses.border} rounded-md p-4${
                    latestLink ? ' pt-6' : ''
                } `}>
                <View className='flex-row gap-2'>
                    <Link
                        className={defaultClasses.releaseTitle}
                        href={titleLink}>
                        {titleText}
                    </Link>
                    {latestLink ? (
                        <Link
                            className='font-geist text-xs md:text-base
                            text-green-600 dark:text-green-400 hover:text-green-700 hover:dark:text-green-300
                            border
                            border-green-600 dark:border-green-800 hover:border-green-900 hover:dark:border-green-700
                            rounded-md mb-auto p-1'
                            href={latestLink}>
                            Latest
                        </Link>
                    ) : undefined}
                </View>
                <Text className={rootClasses.text}>
                    <Markdown
                        rules={rulesMarkdown}
                        style={stylesMarkdown}
                        mergeStyle={false}>
                        {changelog ? changelog : ''}
                    </Markdown>
                </Text>
                <View className='gap-4 mt-8'>
                    <View className='flex-row gap-1'>
                        <Text
                            className={`${rootClasses.text} font-black text-2xl p-py px-1`}>
                            Assets
                        </Text>
                        <Text
                            className={`bg-[#e3e3e6] dark:bg-[#696969] font-normal dark:font-semibold ${rootClasses.text} text-xs md:text-base rounded-md ms-1 mb-auto px-1 p-py`}>
                            {downloadableLength}
                        </Text>
                    </View>
                    <View className={`gap-2 ${rootClasses.border} px-4 py-2`}>
                        {downloadableLinks.length > 0
                            ? downloadableLinks.map(itemRelease => {
                                  const id = itemRelease.id.toString();

                                  return (
                                      <Link
                                          key={id}
                                          className={rootClasses.link}
                                          href={
                                              itemRelease.browser_download_url
                                          }>
                                          {itemRelease.name}
                                      </Link>
                                  );
                              })
                            : undefined}
                        <Link
                            className={rootClasses.link}
                            href={downloadAbleZipBall}>
                            Source code (zip)
                        </Link>
                        <Link
                            className={rootClasses.link}
                            href={downloadAbleTarBall}>
                            Source code (tar.gz)
                        </Link>
                    </View>
                </View>
            </View>
        </View>
    );
}
