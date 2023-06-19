import { useToast } from '@chakra-ui/toast';
import { SubmitHandler } from 'react-hook-form';

import { FormData, GameControl } from '@/components/game-control/GameControl';
import { useGameContext } from '@/contexts/GameContext';
import { useBasicModeMutation } from '@/services/mutations/device/useBasicModeMutation';
import { GameMode } from '@/types/game';

export const BasicControlPage: React.FC = () => {
  const { startOrUpdateGame, resetGame } = useGameContext();
  const toast = useToast();

  const { mutate, isLoading } = useBasicModeMutation({
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

    startOrUpdateGame(GameMode.BASIC, data);
  };

  return <GameControl onSubmit={onSubmit} isLoading={isLoading} />;
};
