import { useState } from 'react';

import { Button } from '@chakra-ui/button';
import { Icon } from '@chakra-ui/icon';
import { QuestionOutlineIcon } from '@chakra-ui/icons';
import { Divider, HStack, Text, VStack } from '@chakra-ui/layout';
import {
  Box,
  IconButton,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  UnorderedList,
  useDisclosure,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/toast';
import { map } from 'lodash';
import { useFormContext } from 'react-hook-form';
import { FaMicrophone } from 'react-icons/fa';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

import { useDeviceStatusContext } from '@/contexts/DeviceStatusContext';
import { useGameContext } from '@/contexts/GameContext';
import { useBorderColor } from '@/hooks/useBorderColor';
import { useStopGameMutation } from '@/services/mutations/device/useStopMutation';
import { BallFeedRate, Spin } from '@/types/settings';

import { FormData } from '../game-control/GameControl';

type Props = { handleSubmit: () => void };

export const VoiceControl: React.FC<Props> = ({ handleSubmit }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [voiceOn, setVoiceOn] = useState(false);

  const { endGame, gameStatus } = useGameContext();
  const { mutate } = useStopGameMutation({
    onSuccess: () => {
      toast({
        title: 'Game stopped',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    },
  });
  const {
    status: { deviceConnected },
  } = useDeviceStatusContext();

  const { setValue, watch } = useFormContext<FormData>();

  const targetArea = watch('targetArea');
  const ballFeedRate = watch('ballFeedRate');

  const commands: {
    command: string | string[] | RegExp;
    callback: (...args: (string | number)[]) => unknown;
    isFuzzyMatch?: boolean | undefined;
    matchInterim?: boolean | undefined;
    fuzzyMatchingThreshold?: number | undefined;
    bestMatchOnly?: boolean | undefined;
  }[] = [
    {
      command: 'stop',
      callback: () => {
        if (gameStatus) {
          endGame();
          mutate();
          stopListening();
        }
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.5,
    },
    {
      command: 'start',
      callback: () => {
        handleSubmit();
        resetTranscript();
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.5,
    },
    {
      command: 'right',
      callback: () => {
        if (targetArea > 1 && targetArea !== 4) {
          setValue('targetArea', targetArea - 1);
          handleSubmit();
          resetTranscript();
        }
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.5,
    },
    {
      command: 'left',
      callback: () => {
        if (targetArea < 6 && targetArea !== 3) {
          setValue('targetArea', targetArea + 1);
          handleSubmit();
          resetTranscript();
        }
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.5,
    },
    {
      command: ['top', 'top spin', 'topspin'],
      callback: () => {
        setValue('spin', Spin.Topspin);
        handleSubmit();
        resetTranscript();
      },
    },
    {
      command: ['back', 'back spin', 'backspin'],
      callback: () => {
        setValue('spin', Spin.Backspin);
        handleSubmit();
        resetTranscript();
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.5,
    },
    {
      command: ['no spin', 'normal'],
      callback: () => {
        setValue('spin', Spin.None);
        handleSubmit();
        resetTranscript();
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.5,
    },
    {
      command: 'slower',
      callback: () => {
        if (targetArea < 4) {
          setValue('targetArea', targetArea + 3);
          handleSubmit();
          resetTranscript();
        }
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.5,
    },
    {
      command: 'faster',
      callback: () => {
        if (targetArea > 3) {
          setValue('targetArea', targetArea - 3);
          handleSubmit();
          resetTranscript();
        }
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.5,
    },
    {
      command: 'more',
      callback: () => {
        if (ballFeedRate === BallFeedRate.Low) {
          setValue('ballFeedRate', BallFeedRate.Medium);
          handleSubmit();
          resetTranscript();
        }
        if (ballFeedRate === BallFeedRate.Medium) {
          setValue('ballFeedRate', BallFeedRate.High);
          handleSubmit();
          resetTranscript();
        }
      },
    },
    {
      command: 'less',
      callback: () => {
        if (ballFeedRate === BallFeedRate.High) {
          setValue('ballFeedRate', BallFeedRate.Medium);
          handleSubmit();
          resetTranscript();
        }
        if (ballFeedRate === BallFeedRate.Medium) {
          setValue('ballFeedRate', BallFeedRate.Low);
          handleSubmit();
          resetTranscript();
        }
      },
    },
  ];

  const { resetTranscript } = useSpeechRecognition({ commands });

  const listen = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: 'en-US',
    }).then(() => setVoiceOn(true));
  };

  const stopListening = () => {
    SpeechRecognition.stopListening().then(() => {
      resetTranscript();
      setVoiceOn(false);
    });
  };

  return (
    <>
      <VStack
        spacing={4}
        p={4}
        borderWidth={1}
        borderRadius="md"
        borderColor={useBorderColor()}
        borderStyle="solid"
        alignItems="center"
      >
        {SpeechRecognition.browserSupportsSpeechRecognition() ? (
          <>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexDirection="row"
              width="100%"
            >
              <HStack align="center">
                <Text fontSize="xl" fontWeight="bold">
                  Voice Control
                </Text>
                <Icon as={FaMicrophone} fontSize="lg" />
              </HStack>

              <IconButton
                size="sm"
                onClick={onOpen}
                aria-label="Help"
                icon={<QuestionOutlineIcon />}
              />
            </Box>

            <Divider />

            <HStack spacing={4}>
              <Button
                colorScheme="red"
                onClick={stopListening}
                isDisabled={!voiceOn}
              >
                Stop
              </Button>

              <Button
                colorScheme="green"
                onClick={listen}
                isDisabled={voiceOn || !deviceConnected}
              >
                Start
              </Button>
            </HStack>
          </>
        ) : (
          <Text>Sorry, your browser does not support speech recognition.</Text>
        )}
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Available Commands</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>The following commands are available.</Text>
            <UnorderedList>
              {map(commands, (command) => (
                <ListItem key={command.command.toString()}>
                  {command.command.toString()}
                </ListItem>
              ))}
            </UnorderedList>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
