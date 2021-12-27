import React, { useState } from 'react';
import { Button, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageEditor from '../../src';

const image = {
  uri: 'https://images.unsplash.com/photo-1640294692089-2821ca381dbd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
};

export default function App() {
  const [visible, setVisible] = useState(false);
  const [imageUri, setImageUri] = useState(image.uri);
  const onBack = () => {
    console.log('On Back');
    setVisible(false);
  };

  const onDone = (newImageUri) => {
    setImageUri(newImageUri);
    setVisible(false);
  };

  return visible ? (
    <ImageEditor source={{ uri: imageUri }} onBack={onBack} onDone={onDone} />
  ) : (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <Image style={{ width: 300, height: 300 }} source={{ uri: imageUri }} />
      <Button onPress={() => setVisible(true)} title="Edit" />
    </SafeAreaView>
  );
}
