import { useToast } from '@chakra-ui/toast';
import { SubmitHandler } from 'react-hook-form';

import { FormData, GameControl } from '@/components/game-control/GameControl';
import { useGameContext } from '@/contexts/GameContext';
import { useRandomModeMutation } from '@/services/mutations/device/useRandomModeMutation';
import { GameMode } from '@/types/game';

export const RandomGamePage = () => {
  const { startOrUpdateGame, resetGame } = useGameContext();
  const toast = useToast();

  const { mutate, isLoading } = useRandomModeMutation({
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        isClosable: true,
        duration: 3000,
      });

      resetGame();
    },
    onSuccess: (data) => {
      toast({
        title: data.message,
        status: 'success',
        isClosable: true,
        duration: 3000,
      });
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    mutate(data);

    startOrUpdateGame(GameMode.RANDOM, data);
  };

  return <GameControl random onSubmit={onSubmit} isLoading={isLoading} />;
};
