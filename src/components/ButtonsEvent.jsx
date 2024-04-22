import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  useToast,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { EditIcon } from "@chakra-ui/icons";
import PropTypes from "prop-types";

export const ButtonsEvent = ({ event }) => {
  // set up useNavigate hook
  const navigate = useNavigate();

  // pop-up message hook
  const toast = useToast();

  // modal actions
  const { isOpen, onOpen, onClose } = useDisclosure();

  // delete request
  const handleDelete = async () => {
    const response = await fetch(`http://localhost:3000/events/` + event.id, {
      method: "DELETE",
    });
    if (response.ok) {
      toast({
        title: "Delete event",
        description: "We have successfully deleted the event!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      navigate("/");
    } else {
      toast({
        title: "Event wasn't deleted",
        description: "Something went wrong!",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }
  };
  return (
    <>
      <Link to={`/event/${event.id}/editevent`}>
        <Button
          size={{ base: "sm", md: "md" }}
          variant="ghost"
          leftIcon={<EditIcon />}
          _hover={{ bg: "#A5A726", color: "white" }}
        >
          Edit Event
        </Button>
      </Link>
      <Button
        onClick={onOpen}
        size={{ base: "sm", md: "md" }}
        variant="ghost"
        leftIcon={<DeleteIcon />}
        _hover={{ bg: "#803419", color: "white" }}
      >
        Delete Event
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={{ base: "xs", lg: "lg" }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="#314447">
            Are you sure you would like to delete this event?
          </ModalHeader>
          <ModalCloseButton />
          <ModalFooter display="flex">
            <Button
              onClick={handleDelete}
              color="white"
              background="#A5A726"
              mb="20px"
              mr="10px"
            >
              Yes
            </Button>
            <Button
              onClick={onClose}
              color="white"
              background="#803419"
              mb="20px"
            >
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

// Prop validation
ButtonsEvent.propTypes = {
  event: PropTypes.object,
  onClick: PropTypes.func,
};
