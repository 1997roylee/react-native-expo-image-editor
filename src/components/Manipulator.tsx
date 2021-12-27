import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  Animated,
  Dimensions,
  View,
  ImageBackground,
} from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';
import FadeView from './FadeView';
import Label from './Label';
import { useProvider } from './Provider';
import Row from './Row';
import { getImageLayout } from './utils';
import Cropper from './Cropper';
import styles from '../styles/Manipulator.style';
import cropImage from '../functions/cropImage';
import rotateImage from '../functions/rotateImage';

const { width, height } = Dimensions.get('window');

const AnimatedImageBackground =
  Animated.createAnimatedComponent(ImageBackground);

interface IManipulatorProps {
  uri: string;
  onUpdate: (newImage: any) => void;
}

const options = {
  compress: 1,
  format: ImageManipulator.SaveFormat.PNG,
  base64: false,
};

export default function Manipulator(props: IManipulatorProps) {
  const { uri, onUpdate } = props;
  const [imageUri, setImageUri] = useState(uri);
  // const { rotateVal, rotate } = useRotate();
  const cropperRef = useRef(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  // const [displaySize, setDisplaySize] = useState({ width: 0, height: 0 });
  const {
    manipulator: { visible, setVisible },
  } = useProvider();

  // const getAnimatedImageStyle = () => {
  //   return {
  //     transform: [
  //       {
  //         rotate: rotateVal.interpolate({
  //           inputRange: [0, 1],
  //           outputRange: ['0deg', '360deg'],
  //         }),
  //       },
  //     ],
  //   };
  // };

  // shouldSetNewImageSize
  useEffect(() => {
    (async () => {
      const resized = await getImageLayout(imageUri, width, height);
      setImageSize(resized);
      resetCropper();
    })();
  }, [imageUri]);

  const handleDone = async () => {
    if (cropperRef && cropperRef.current) {
      const croppedImage = await cropImage(
        imageUri,
        await (cropperRef.current as any).getCroppedData(imageUri)
      );
      onUpdate(croppedImage);
      resetCropper();
      setVisible(false);
    }
  };

  const handleRotate = async () => {
    const rotatedResult = await rotateImage(imageUri, options);
    setImageUri(rotatedResult.uri);
  };

  const handleReset = () => {
    resetCropper();
  };

  const resetCropper = () => {
    if (cropperRef && cropperRef.current) (cropperRef.current as any).reset();
  };

  return (
    <FadeView visible={visible} style={styles.fadeView}>
      <SafeAreaView style={styles.container}>
        <Row style={styles.header}>
          <Label onPress={handleReset}>重設</Label>
          <Label onPress={handleDone}>完成</Label>
        </Row>
        <View style={styles.content}>
          {imageSize.width && imageSize.height ? (
            <Cropper
              ref={cropperRef}
              imageWidth={imageSize.width}
              imageHeight={imageSize.height}
            >
              <Animated.View
                style={[
                  {
                    width: imageSize.width,
                    height: imageSize.height,
                  },
                ]}
              >
                <AnimatedImageBackground
                  source={{ uri: imageUri }}
                  // resizeMethod={'scale'}
                  style={[
                    {
                      width: imageSize.width,
                      height: imageSize.height,
                    },
                  ]}
                />
              </Animated.View>
            </Cropper>
          ) : null}
        </View>

        <Row style={styles.footer}>
          <Label onPress={handleRotate}>旋轉</Label>
        </Row>
      </SafeAreaView>
    </FadeView>
  );
}
