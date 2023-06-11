import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {NavigationContainer} from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from './components/HomeScreen';
import CreatorScreen from './components/CreatorScreen';
import AboutScreen from './components/AboutScreen';
import { NativeBaseProvider, extendTheme } from "native-base";

const Drawer = createDrawerNavigator();


const theme = extendTheme({
  colors: {
    main: '#f25f5c',
    secondary: '#ffe066',
    blue: '#247ba0',
    whiteblue: '#70c1b3',
    
  },
});


const headerStyles = {
  headerStyle: {
    backgroundColor: theme.colors.secondary,
  },
  headerTintColor: "#fff",
};
export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Drawer.Navigator>
            <Drawer.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: "Trending Memes",
                ...headerStyles,
              }}
            />
            <Drawer.Screen
              name="Creator"
              component={CreatorScreen}
              options={{
                title: "Meme Generator",
                ...headerStyles,
              }}
            />
            <Drawer.Screen
              name="About"
              component={AboutScreen}
              options={{
                title: "About the App",
                ...headerStyles,
              }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
}


