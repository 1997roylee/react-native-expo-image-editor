// src/components/Rotate.tsx
import { useRef, useCallback } from 'react';
import { Animated } from 'react-native';

export function useRotate() {
  const rotateVal = useRef(new Animated.Value(0)).current;
  const rotate = () => {
    rotateVal.setValue(((rotateVal as any)._value % 1) + 0.25);
  };

  return {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    rotate: useCallback(rotate, []),
    rotateVal,
  };
}
