import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Loading from './Loading';
import ErrorResult from './ErrorResult';
interface SkeletonProps {
  isLoading: boolean;
  children: React.ReactNode;
  error?: ErrorModel;
  onReload?: () => void;
}
const skeleton = (props: SkeletonProps) => {
  const [canRenderChild, setCanRenderChild] = useState(false);
  useEffect(() => {
    setCanRenderChild(!(props.error || props.isLoading));
  }, [props.error, props.isLoading]);
  return (
    <View style={style.container}>
      {canRenderChild ? (
        props.children
      ) : (
        <>
          {props.error && (
            <ErrorResult message={props.error} onReload={props.onReload} />
          )}
          {props.isLoading && <Loading />}
        </>
      )}
    </View>
  );
};
const style = StyleSheet.create({
  container: {flex: 1},
});
export default skeleton;
