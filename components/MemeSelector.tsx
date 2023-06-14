import { Heading, Row, Pressable, Image, HStack, Center } from "native-base";
import { useState, useEffect } from 'react';
import { useApi, Meme } from '../hooks/useApi';

interface MemeProps {
  activeMeme?: string;
  onSelect: (meme: Meme) => void;
}

const MemeSelector: React.FC<MemeProps> = (props) => {
  const { getMemes } = useApi();
  const [memes, setMemes] = useState<Meme[] | null>(null);

  useEffect(() => {
    const loadMemes = () => {
      getMemes().then((results) => {
        setMemes(results);
      });
    };
    loadMemes();
  }, []);

  const memeSelected = (meme: Meme) => {
    props.onSelect(meme);
  };

  return (
    <>
      <Center mt={5}>
        <Heading>Select your Meme:</Heading>
      </Center>
      <Row
        flexWrap={"wrap"}
        mb={5}
        mt={5}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {memes?.map((meme) => (
          <Pressable
            key={meme.name}
            m={1}
            onPress={ () => memeSelected(meme) }
            backgroundColor={props.activeMeme === meme.name ? "red.600" : "white"}
            shadow="2"
          >
            <Center p={1} >
              <Image
                alt="Meme"
                source={meme.image}
                size={"lg"}
                borderColor={"red.600"}
                borderWidth={props.activeMeme === meme.name ? 6 : 0}
              />
            </Center>
          </Pressable>
        ))}
      </Row>
    </>
  );
};

export default MemeSelector;