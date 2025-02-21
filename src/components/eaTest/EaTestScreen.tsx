import React, {createContext, useContext, useMemo, useState} from "react";
import {
    FlatList,
    ListRenderItemInfo, ScrollView,
    StyleSheet,
    View
} from "react-native";
import ScalingNotAllowedText from "../global/ScalingNotAllowedText.tsx";
import {BackgroundColor, FontColor, FontSize} from "../../config/globalStyleSheetConfig.ts";
import {NavigationProps} from "../home/homePage.tsx";
import {SvgXml} from "react-native-svg";
import XMLResources from "../../basic/XMLResources.ts";
import TruncatedTextContainer from "./TruncatedTextContainer.tsx";
import {getDiffTimeString, getNumberString, ImageSize} from "../../utils/eaTestUtils.ts";
import {Blog, Uploader} from "../../dao/eaTest.ts";
import ImageContainer from "./ImageContainer.tsx";

const LastTimeContent = createContext<{
    lastTime: Date,
    setLastTime: React.Dispatch<React.SetStateAction<Date>>
}>({lastTime: new Date(Date.now()), setLastTime: () => {}});

export const EaTestScreen = ({navigation}: NavigationProps) => {
    const [lastTime, setLastTime] = useState(new Date(Date.now()));

    const postContentData = useState([]);


    return (
        <LastTimeContent.Provider value={{lastTime, setLastTime}}>
            <View style={{width: '100%', flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                <FlatList
                    data={postContentData}
                    renderItem={(item: any) => {
                        return (
                            <PostContentBox
                                uploader={item.uploader}
                                blog={item.blog} />
                        )
                    }} />
                <ScrollView style={ss.contentListContainer}>
                    <PostContentBox
                        uploader={{
                            avatarUri: '',
                            nickname: 'zeLNer'
                        }}
                        blog={{
                            uploader: {
                                avatarUri: '',
                                nickname: 'zeLNer'
                            },
                            uploadDate: new Date(Date.now()),
                            content: {
                                text: 'This is a test blog content.',
                                images: []
                            },
                            tags: ['news', 'ATest', 'XTU'],
                            numberOfComments: 45,
                            numberOfLikes: 45120,
                        }}
                    />
                </ScrollView>
            </View>
        </LastTimeContent.Provider>
    )
}

export const EaTestHeader = () => {
    return (
        <View style={ss.headerContainer}>
            <ScalingNotAllowedText style={{color: FontColor.light, fontSize: FontSize.ll}}>EaTest</ScalingNotAllowedText>
        </View>
    )
}

export interface PostContentBoxProps {
    uploader: Uploader,
    blog: Blog,
}

const PostContentBox = (props: PostContentBoxProps) => {
    const {uploader, blog} = props;
    const {lastTime} = useContext(LastTimeContent);

    const [visible, setVisible] = useState(false);

    const dateText = useMemo(() => {
        return getDiffTimeString(lastTime, blog.uploadDate);
    }, [blog, lastTime]);

    const onLoaded = () => {
        setVisible(true);
    }

    return (
        <View style={ss.contentBoxContainer}>
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                <View style={ss.posterAvatarContainer}>
                    <View style={{height: 35, width: 35, borderRadius: 20, backgroundColor: 'grey'}}>

                    </View>
                </View>
                <View style={{display: 'flex', flexDirection: 'column'}}>
                    {/* nickname */}
                    <ScalingNotAllowedText style={{color: FontColor.dark, fontSize: FontSize.l, fontWeight: '700'}}>{uploader.nickname}</ScalingNotAllowedText>
                    {/* date */}
                    <ScalingNotAllowedText style={{color: FontColor.grey, fontSize: FontSize.s, fontWeight: '700'}}>{dateText}</ScalingNotAllowedText>
                </View>
            </View>

            {
                blog.tags.length !== 0 && (
                    <TagContainer tags={blog.tags} />
                )
            }

            <View style={{width: '100%', display: visible ? 'flex' : 'none'}}>
                {/* text */}
                <TruncatedTextContainer text={blog.content.text} />
                {/* pic */}
                <View>
                    <ImageContainer
                        imageUris={['http://i0.hdslb.com/bfs/new_dyn/1fb6df6026dddb1f487109ead1de432b49960899.jpg']}
                        imageSize={ImageSize.Medium}
                        onLoaded={onLoaded}/>
                </View>
                {/* share && like && comment */}
                <View style={ss.actionContainer}>
                    <View style={ss.iconNumContainer}>
                        <SvgXml xml={XMLResources.notCommented} width={20} height={20} />
                        {
                            blog.numberOfComments !== undefined &&
                            <ScalingNotAllowedText style={{color: FontColor.dark, fontSize: FontSize.m, fontWeight: '500', marginLeft: 8}}>{getNumberString(blog.numberOfComments)}</ScalingNotAllowedText>
                        }
                    </View>
                    <View style={ss.iconNumContainer}>
                        <SvgXml xml={XMLResources.notLiked} width={20} height={20} />
                        {
                            blog.numberOfLikes !== undefined &&
                            <ScalingNotAllowedText style={{color: FontColor.dark, fontSize: FontSize.m, fontWeight: '500', marginLeft: 8}}>{getNumberString(blog.numberOfLikes)}</ScalingNotAllowedText>
                        }
                    </View>
                </View>
            </View>
        </View>
    );
}

const TagContainer = ({tags}: {tags: string[]}) => {
    const handleRenderItem = (tag: ListRenderItemInfo<string>) => {
        return (
            <View style={{marginRight: 10}}>
                <ScalingNotAllowedText style={{color: FontColor.secondary, fontSize: FontSize.ll, fontWeight: '700'}}>{`#${tag.item}`}</ScalingNotAllowedText>
            </View>
        )
    }

    return (
        <FlatList
            data={tags}
            renderItem={handleRenderItem}
            horizontal={true}/>
    )
}

const ss = StyleSheet.create({
    contentListContainer: {
        width: '95%',
    },

    contentBoxContainer: {
        width: '100%',
        borderRadius: 5,
        backgroundColor: 'rgb(255,229,232)',
        paddingHorizontal: '5%',
        paddingTop: 15,
        paddingBottom: 8,
        marginVertical: 5
    },

    posterAvatarContainer: {
        marginRight: 10,
    },

    actionContainer: {
        marginTop: 20,
        paddingHorizontal: '8%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },

    headerContainer: {
        backgroundColor: BackgroundColor.primary,
        width: '100%',
        paddingBottom: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },

    iconNumContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
})
