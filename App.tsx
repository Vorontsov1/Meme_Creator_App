import "react-native-gesture-handler";
import {
  Box,
  Center,
  extendTheme,
  Heading,
  HStack,
  Icon,
  NativeBaseProvider,
  Pressable,
  Text,
  VStack,
} from "native-base";
import {
  DrawerContentScrollView,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./components/HomeScreen";
import CreatorScreen from "./components/CreatorScreen";
import AboutScreen from "./components/AboutScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const Drawer = createDrawerNavigator();

const theme = extendTheme({});

const getIcon = (screenName: string) => {
  switch (screenName) {
    case "Home":
      return "home";
    case "Creator":
      return "fire";
    case "About":
      return "information-outline";
    default:
      return undefined;
  }
}

const CustomDrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView {...props}>
      <Center>
        <Heading size="lg" mb={2} color={"amber.500"}>
          Menu
        </Heading>
      </Center>
      <VStack space={5} my={2} mx={1}>
        {props.state.routeNames.map((name: string, index: number) => (
          <Pressable
            rounded="lg"
            _pressed={{ opacity: 0.5 }}
            px={3}
            bg={index === props.state.index ? "warning.100" : "transparent"}
            key={index}
            onPress={() => props.navigation.navigate(name)}
          >
            <HStack p={4} space={3} alignItems="center">
              <Icon
                as={MaterialCommunityIcons}
                name={getIcon(name)}
                size={7}
                ml={2}
                color={index === props.state.index ? "warning.600" : "lime.600"}
              ></Icon>

              <Text
                fontWeight="bold"
                fontSize="xl"
                color={index === props.state.index ? "warning.600" : "lime.600"}
              >
                {name}
              </Text>
            </HStack>
          </Pressable>
        ))}
      </VStack>
    </DrawerContentScrollView>
  );
};

const headerStyles = {
  headerStyle: {
    backgroundColor: theme.colors.amber[500],
  },
  headerTintColor: "#fff",
};

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            initialRouteName="Home"
          >
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
