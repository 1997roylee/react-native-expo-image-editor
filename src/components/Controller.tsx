// src/components/Controller.tsx
import React, { cloneElement } from 'react';
import { SafeAreaView } from 'react-native';
import { useProvider } from './Provider';
import Row from './Row';
import Label from './Label';
import styles from '../styles/Controller.style';

interface IControllerProps {
  children: any;
  onBack: () => void;
  onDone: () => void;
}

export default function Controller(props: IControllerProps) {
  const { children, onBack, onDone } = props;
  const {
    manipulator: { setVisible },
  } = useProvider();

  const handleCrop = () => {
    setVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Row>
        <Label onPress={onBack}>退出</Label>
        <Label onPress={handleCrop}>剪裁</Label>
      </Row>
      {cloneElement(children, [], [])}
      <Row>
        <Label />
        <Label onPress={onDone}>完成</Label>
      </Row>
    </SafeAreaView>
  );
}
