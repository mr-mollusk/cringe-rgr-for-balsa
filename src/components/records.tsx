import {
  Box,
  Button,
  Heading,
  HStack,
  Input,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../store";

const Records = () => {
  const store = useStore();
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const addRecord = () => {
    store.todoRecord({ id: 0, title: title, description: description });
    setTitle("");
    setDescription("");
    onClose();
    toast({
      title: "Книга добавлена",
      description: "Мы успешно добавили вашу книгу в базу",
      status: "success",
      position: "top",
      duration: 4000,
      isClosable: true,
    });
  };

  const changeNewBookTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const changeNewBookDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  return (
    <Box
      sx={{
        minH: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "10px",
      }}
    >
      <Box
        flex={"1 0 100%"}
        display={"flex"}
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-end"
      >
        {store.todoList[0] && (
          <TableContainer minW={"100%"}>
            <Table variant="simple" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th isNumeric>
                    <Text fontWeight={700}>ID</Text>
                  </Th>
                  <Th>
                    <Text fontWeight={700}>Название</Text>
                  </Th>
                  <Th width={"50%"}>
                    <Text fontWeight={700}>Описание</Text>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {store.todoList.map((todo, id) => (
                  <Tr key={id}>
                    <Th isNumeric>{todo.id}</Th>
                    <Th>{todo.title}</Th>
                    <Th>{todo.description}</Th>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>
      <Button colorScheme="blue" onClick={onOpen}>
        Добавить книгу в базу
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Добавить книгу</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Название</Text>
            <Input value={title} onChange={changeNewBookTitle} />
            <Text>Описание</Text>
            <Textarea value={description} onChange={changeNewBookDescription} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={addRecord}>
              Отправить
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
export default observer(Records);
