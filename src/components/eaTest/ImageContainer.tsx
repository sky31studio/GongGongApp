import {Image, StyleSheet, useWindowDimensions, View} from "react-native";
import {ImageSize} from "../../utils/eaTestUtils.ts";
import {useEffect, useMemo, useState} from "react";

const ImageContainer = ({imageUris, imageSize, onLoaded}: {imageUris: string[], imageSize: number, onLoaded: () => void}) => {
    const windowWidth = useWindowDimensions().width;

    const [mediumAspectRatio, setMediumAspectRatio] = useState(3 / 4);

    const containerWidth = useMemo(() => {
        return windowWidth * 0.95 * 0.9
    }, [windowWidth]);

    useEffect(() => {
        if(imageUris) {
            if(imageSize === ImageSize.Medium) {
                Image.getSize(imageUris[0], (width, height) => {
                    const aspectRatio = width / height;

                    if(aspectRatio > 3 / 4) {
                        setMediumAspectRatio(aspectRatio);
                    }
                    onLoaded();
                })
            }
        }
    }, [imageUris]);

    return (
        <View style={{width: '100%', marginVertical: 5}}>
            {imageSize === ImageSize.Large && imageUris.length === 1 && (
                <Image
                    source={require('../../assets/png/testImage.png')}
                    style={[{width: '100%', height: undefined, aspectRatio: 16 / 9}, ss.imageDefaultStyle]}
                    resizeMode={'center'}/>
            )}

            {imageSize === ImageSize.Medium && imageUris.length === 1 && (
                <Image
                    source={require('../../assets/png/testImage.png')}
                    style={[{width: '70%', height: undefined, aspectRatio: mediumAspectRatio}, ss.imageDefaultStyle]}
                />
            )}

            {imageSize === ImageSize.Small && (
                <View style={[ss.smallContainer, {width: imageUris.length === 4 ? (containerWidth - 12) * 2 / 3 + 12 : containerWidth}]}>
                    {imageUris.map((uri: string, index: number) => {
                        return (
                            <Image
                                id={index.toString()}
                                source={require('../../assets/png/testImage.png')}
                                style={[ss.smallImageStyle, {width: (containerWidth - 12) / 3}]} />
                        )
                    })}
                </View>
            )}
        </View>
    )
}

export default ImageContainer;

const ss = StyleSheet.create({
    imageDefaultStyle: {
        borderRadius: 15,
    },

    smallImageStyle: {
        height: undefined,
        aspectRatio: 1,
        margin: 2,
        borderRadius: 5
    },

    smallContainer: {
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    }
});
