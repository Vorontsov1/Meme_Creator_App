import {
  Heading,
  Box,
  Center,
  Container,
  ScrollView,
  Image,
  HStack,
  VStack,
  FormControl,
  Input,
  Button,
  Spinner,
  Modal,
  useToast,
} from "native-base";
import { memes } from "../assets/list.ts";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Meme, useApi } from "../hooks/useApi";
import MemeSelector from "../components/MemeSelector";
// import { CameraRoll } from "@react-native-camera-roll/camera-roll";



interface RouteProps {
  navigation: NavigationProp<any, any>;
  route: RouteProp<{ params: { meme: string } }, "params">;
}

export default CreatorScreen = ({ route }: RouteProps) => {
  const { createMeme } = useApi();
  const toast = useToast();


  const [top, setTop] = useState("");
  const [bottom, setBottom] = useState("");
  const [selected, setSelected] = useState<any>();
  const [result, setResult] = useState<any>();
  const [selectedName, setSelectedName] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const { meme } = route.params || { meme: "10-Guy" };
    setSelected(memes[meme]);
    setSelectedName(meme);
  }, [route]);

  const memeSelected = (meme: Meme) => {
    setSelected(meme.image);
    setSelectedName(meme.name);
  };

  const doCreateMeme = async () => {
    setLoading(true);

    const memeBlob = await createMeme(top, bottom, selectedName!);
    console.log("RESULT: ");
    setLoading(false);
    setShowModal(true);
    setLoading(true);

 
    const fileReaderInstance = new FileReader()
    fileReaderInstance.readAsDataURL(memeBlob.data)
    fileReaderInstance.onload = () => {
      console.log('ONLOAD')

      const base64data = fileReaderInstance.result
      setResult(base64data)
      setShowModal(true)
    }
  }


    const startDownload = async () => {
      await CameraRoll.save(result);
      setShowModal(false);
      toast.show({ description: "Meme saved" });
    }
  


    return (
      <ScrollView>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
          <Modal.Content maxWidth={400}>
            <Modal.CloseButton />
            <Modal.Header>Your Meme</Modal.Header>
            <Modal.Body>
              <Image
                source={ { uri: result } }
                alt="Meme"
                resizeMode="contain"
                height={'400'}
                width={'200'}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button flex={1} onPress={() => startDownload()}>
                Download
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
        {loading && (
          <HStack m={10} space={2} justifyContent="center">
            <Spinner
              accessibilityLabel="Loading meme"
              color={"secondary.500"}
            />
            <Heading color="secondary.500" fontSize="md">
              Creating meme...
            </Heading>
          </HStack>
        )}
        {!loading && (
          <HStack m={4} mb={10} space={2}>
            <VStack space={2} w={"60%"}>
              <FormControl>
                <Input
                  placeholder="Top text"
                  onChangeText={(text) => setTop(text)}
                />
              </FormControl>
              <FormControl>
                <Input
                  placeholder="Bottom text"
                  onChangeText={(text) => setBottom(text)}
                />
              </FormControl>
              <Button
                colorScheme={"secondary"}
                onPress={() => doCreateMeme()}
                size="md"
              >
                Create Meme
              </Button>
            </VStack>
            <Center>
              <Image
                key={selected}
                source={selected}
                alt="Selected Meme"
              ></Image>
            </Center>
          </HStack>
        )}

        <MemeSelector
          onSelect={(meme) => memeSelected(meme)}
          activeMeme={selectedName}
        />
      </ScrollView>
    );
  }


