import {useEffect, useMemo} from 'react';

import {useTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useDispatch} from 'react-redux';

import {Home} from '../../pages/Home';
import {Settings} from '../../pages/Settings';
import {clearCalcHistory} from '../../store/slices/calculator';

const Stack = createNativeStackNavigator();

export const NavBar = ({isDark, setIsDark}) => {
  const position = useSharedValue(isDark ? 6 : 34);
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: position.value}],
    };
  }, [position]);
  const icon = isDark
    ? require('../../../assets/icons/settings-white.png')
    : require('../../../assets/icons/settings-black.png');
  const iconClear = isDark
    ? require('../../../assets/icons/clearAllWhite.png')
    : require('../../../assets/icons/clearAllBlack.png');
  const pressHandler = () => {
    setIsDark(!isDark);
    position.value = withTiming(position.value === 6 ? 34 : 6);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    position.value = isDark ? 6 : 34;
  }, []);

  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={({navigation}) => ({
            headerTitle: () => (
              <View style={styles.container}>
                <Text style={[styles.title, {color: theme.colors.foreground}]}>
                  Modsen Calculator
                </Text>
                <TouchableHighlight
                  onPress={() =>
                    navigation.navigate('Settings', {name: 'Settings'})
                  }
                  activeOpacity={0.6}
                  underlayColor={theme.colors.background}>
                  <Image style={styles.imageBtn} source={icon} />
                </TouchableHighlight>
              </View>
            ),
            headerStyle: {
              backgroundColor: theme.colors.background,
            },
            headerShadowVisible: false,
          })}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={() => ({
            headerTitle: () => (
              <View style={styles.containerSettings}>
                <Text style={[styles.title, {color: theme.colors.foreground}]}>
                  Settings
                </Text>
              </View>
            ),
            headerRight: () => (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableHighlight
                  onPress={() => {
                    pressHandler();
                  }}
                  activeOpacity={0.6}
                  underlayColor={theme.colors.background}
                  style={[
                    styles.switchContainer,
                    {backgroundColor: theme.colors.foreground},
                  ]}>
                  <Animated.Text
                    style={[
                      styles.switch,
                      {
                        transform: [{translateX: position}],
                      },

                      animatedStyles,
                    ]}></Animated.Text>
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={() => {
                    dispatch(clearCalcHistory());
                  }}
                  activeOpacity={0.6}
                  underlayColor={theme.colors.background}>
                  <Image source={iconClear} style={styles.imageClear} />
                </TouchableHighlight>
              </View>
            ),
            headerStyle: {
              backgroundColor: theme.colors.background,
            },
            headerTintColor: theme.colors.foreground,
            headerShadowVisible: false,
          })}
        />
      </Stack.Navigator>
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />
    </>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    imageBtn: {
      flex: 1,
      width: 30,
      height: 30,
      resizeMode: 'contain',
    },
    imageClear: {
      flex: 1,
      width: 36,
      height: 36,
      resizeMode: 'contain',
    },
    title: {
      flex: 1,
      fontSize: 24,
      fontFamily: 'Poppins-Medium',
    },
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: 16,
      paddingRight: 48,
    },
    containerSettings: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    switchContainer: {
      width: 64,
      height: 28,
      borderRadius: 15,
      backgroundColor: '#000',
      marginRight: 12,
      justifyContent: 'center',
    },
    switch: {
      width: 22,
      height: 22,
      borderRadius: 15,
      backgroundColor: '#fff',
      backgroundColor: theme.colors.background,
    },
  });
