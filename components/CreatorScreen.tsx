import { Heading, Box, Center, Container, ScrollView } from "native-base";
import { memes } from '../assets/list.ts';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {Meme, useApi} from '../hooks/useApi';
import MemeSelector from '../components/MemeSelector';






interface RouteProps {
  navigation: NavigationProp<any, any>
  route: RouteProp<{params: {meme: string}}, 'params'>;
}


export default CreatorScreen = ({ route }: RouteProps) => {
  const [selected, setSelected] = useState<any>();
  const [selectedName, setSelectedName] = useState<string>();


    useEffect(() => {
      const { meme } = route.params || { meme: '10-Guy' }
      setSelected(memes[meme]);
      setSelectedName(meme);
    }, [route]);
   
  
  const memeSelected = (meme: Meme) => {
    setSelected(meme.image);
    setSelectedName(meme.name);
  };

  return (
    <ScrollView>
      <MemeSelector onSelect={(meme) => memeSelected(meme)} activeMeme={selectedName} />
    </ScrollView>
  );
};
