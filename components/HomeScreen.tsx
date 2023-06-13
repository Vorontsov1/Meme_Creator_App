import {
  Heading,
  Box,
  Center,
  Container,
  ScrollView,
  VStack,
  Skeleton,
  Text,
  View,
  useTheme,
} from "native-base";
import { useEffect, useState } from 'react';
import { useApi, TrendingMemes } from "../hooks/useApi";
import Swiper   from 'react-native-swiper';
import { StyleSheet, Image } from 'react-native';
import MemeSelector from "../components/MemeSelector";
import {NavigationProp} from '@react-navigation/native';


interface RouteProps {
  navigation: NavigationProp<any>;
}

export default HomeScreen = ({navigation}: RouteProps)  => {
  const theme = useTheme();
  
  const { getTrending } = useApi();
  const [memes, setMemes] = useState<TrendingMemes[] | null>(null);
  const [ loading, setLoading ] = useState(true);


  const styles = StyleSheet.create({
    wrapper: {
      height: 400,
    },
    slide1: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#9DD6EB",
    },
    text: {
      color:  theme.colors.primary[500],
      fontSize: 30,
      fontWeight: "bold",
      marginTop: 20,
    },
  });


  useEffect(() => {
    const loadMemes = async () => { 
      const result = await getTrending();
      setMemes(result)
      setLoading(false)
    }
    loadMemes(); 
  }, []);


  const memeSelected = (meme: Meme) => { 
    navigation.navigate('Creator', {meme: meme.name})
  }

  return (
    <ScrollView>
      {loading && (
        <Center w="100%" mt={8}>
          <VStack w="90%" space={4}>
            <Skeleton.Text px="2" />
            <Skeleton h="80" />
          </VStack>
        </Center>
      )}

      {!loading && (
        <Swiper
          style={styles.wrapper}
          showsButtons={true}
          showsPagination={false}
        >
          {memes?.map((meme, index) => (
            <View key={index}>
              <VStack alignItems={"center"} space={2} mt={4}>
                <Heading style={styles.text}>{meme.title}</Heading>
                <Image
                  source={{ uri: meme.url }}
                  resizeMode="contain"
                  style={{ width: "90%", height: 350 }}
                ></Image>
              </VStack>
            </View>
          ))}
        </Swiper>
      )}
      <MemeSelector onSelect={(meme) => memeSelected(meme)} />
    </ScrollView>
  );
};
