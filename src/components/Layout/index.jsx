import {useState} from 'react';

import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {useColorScheme} from 'react-native';

import {NavBar} from '../NavBar';

const DarkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#17181A',
    foreground: '#FFFFFF',
    buttonBackground: '#303136',
    buttonColor: '#38B9FF',
    equalsButtonBackground: '#1991FF',
    equalsButtonColor: '#B2DAFF',
    switchBackground: '#000000',
    opsColor: '#339DFF',
    opsBackground: '#005DB2',
    clearBtnsColor: '#A5A5A5',
    clearBtnsBackground: '#616161',
  },
};

const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#F7F8FB',
    foreground: '#424242',
    buttonBackground: '#FFFFFF',
    buttonColor: '#29A8FF',
    equalsButtonBackground: '#1991FF',
    equalsButtonColor: '#B2DAFF',
    switchBackground: '#000000',
    opsColor: '#109DFF',
    opsBackground: '#ADE2FF',
    clearBtnsColor: '#858585',
    clearBtnsBackground: '#FFFFFF',
  },
};

export const Layout = () => {
  const scheme = useColorScheme();
  const [isDark, setIsDark] = useState(scheme === 'dark' ? true : false);

  return (
    <NavigationContainer theme={isDark ? DarkTheme : LightTheme}>
      <NavBar isDark={isDark} setIsDark={setIsDark} />
    </NavigationContainer>
  );
};
