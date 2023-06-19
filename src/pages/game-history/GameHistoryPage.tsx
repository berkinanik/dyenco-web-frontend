import { Fragment, useRef, useState } from 'react';

import { ChevronDownIcon, ChevronUpIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Collapse,
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { format, millisecondsToSeconds } from 'date-fns';
import { map, orderBy } from 'lodash';

import { useGameContext } from '@/contexts/GameContext';

export const GameHistoryPage = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [gameIdToDelete, setGameIdToDelete] = useState<string | null>(null);
  const cancelRef = useRef(null);

  const { gameHistory, removeGameHistory } = useGameContext();

  const handleToggleExpand = (id: string) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  return (
    <>
      <Box p={4} overflowX="auto">
        <Table variant="simple" textAlign="center">
          <Thead>
            <Tr>
              <Th textAlign="center">#</Th>
              <Th textAlign="center">Date</Th>
              <Th textAlign="center">Length</Th>
              <Th textAlign="center">Mode</Th>
              <Th textAlign="center">Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {typeof gameHistory === 'undefined' || gameHistory.length === 0 ? (
              <Tr>
                <Td colSpan={5} textAlign="center">
                  No game history available.
                </Td>
              </Tr>
            ) : (
              map(
                orderBy(gameHistory, ['date'], ['desc']),
                (history, index) => (
                  <Fragment key={history.id}>
                    <Tr>
                      <Td textAlign="center">
                        Game #{gameHistory.length - index}
                      </Td>
                      <Td textAlign="center">
                        {format(history.date, 'dd.MM.yyyy HH:mm')}
                      </Td>
                      <Td textAlign="center">
                        {millisecondsToSeconds(history.length)} seconds
                      </Td>
                      <Td textAlign="center">{history.mode}</Td>
                      <Td textAlign="center">
                        <IconButton
                          aria-label="Expand"
                          variant="outline"
                          size="sm"
                          icon={
                            expandedId === history.id ? (
                              <ChevronUpIcon />
                            ) : (
                              <ChevronDownIcon />
                            )
                          }
                          onClick={() => handleToggleExpand(history.id)}
                        />
                        <IconButton
                          aria-label="Delete"
                          variant="outline"
                          size="sm"
                          icon={<DeleteIcon />}
                          onClick={() => {
                            setGameIdToDelete(history.id);
                            onOpen();
                          }}
                          ml={2}
                        />
                      </Td>
                    </Tr>

                    <tr>
                      <td colSpan={5}>
                        <Collapse in={expandedId === history.id} animateOpacity>
                          <Box py={4} px={10}>
                            <Table variant="striped">
                              <Thead>
                                <Tr>
                                  <Th textAlign="center">#</Th>
                                  <Th textAlign="center">Target Area</Th>
                                  <Th textAlign="center">Spin</Th>
                                  <Th textAlign="center">Ball Feed Rate</Th>
                                  <Th textAlign="center">Length</Th>
                                </Tr>
                              </Thead>
                              <Tbody>
                                {map(history.contents, (content, index) => (
                                  <Tr key={index}>
                                    <Td textAlign="center">{content.id}</Td>
                                    <Td textAlign="center">
                                      {content.targetArea}
                                    </Td>
                                    <Td textAlign="center">{content.spin}</Td>
                                    <Td textAlign="center">
                                      {content.ballFeedRate}
                                    </Td>
                                    <Td textAlign="center">
                                      {millisecondsToSeconds(content.length)}{' '}
                                      seconds
                                    </Td>
                                  </Tr>
                                ))}
                              </Tbody>
                            </Table>
                          </Box>
                        </Collapse>
                      </td>
                    </tr>
                  </Fragment>
                ),
              )
            )}
          </Tbody>
        </Table>
      </Box>

      {gameIdToDelete ? (
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader
                fontSize="lg"
                fontWeight="bold"
                textAlign="center"
              >
                Delete Game #{gameIdToDelete}
              </AlertDialogHeader>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => {
                    removeGameHistory(gameIdToDelete);
                    setGameIdToDelete(null);
                    onClose();
                  }}
                  ml={3}
                >
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      ) : null}
    </>
  );
};
