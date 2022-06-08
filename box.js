import Animated, {
    withSpring,
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';

import {Button} from 'react-native'; 


export default function Box() {
    const offset = useSharedValue(0);
    
    // First way of creating worklet by plugin, passing anonymous function as argument
    // https://github.com/software-mansion/react-native-reanimated/blob/b4ee4ea9a1f246c461dd1819c6f3d48440a25756/plugin.js#L7
    const defaultSpringStyles = useAnimatedStyle(() => {
	return {
	    transform: [{ translateX: withSpring(offset.value * 255) }],
	};
    });
    
    // Another way of creating worklet by plugin, using 'worklet' directive
    // https://github.com/software-mansion/react-native-reanimated/blob/b4ee4ea9a1f246c461dd1819c6f3d48440a25756/plugin.js#L575
    function worklet_function(msg) {
	'worklet'
        return {
	    transform: [{ translateX:
			  withSpring(offset.value * 255, {damping: 20,
							  stiffness: 90}) }]
	};
    };
    
    
    const customSpringStyles = useAnimatedStyle(worklet_function);
    
  return (
	  <>
	  <Animated.View style={[{width: 30, height: 30,
				  backgroundColor: "red"}, defaultSpringStyles]} />
	  <Animated.View style={[{width: 30, height: 30,
				  backgroundColor: "red"}, customSpringStyles]} />
	  <Button onPress={() => (offset.value = Math.random())} title="Move" />
	  </>
  );
}
