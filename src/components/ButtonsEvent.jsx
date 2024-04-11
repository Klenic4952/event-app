import { Link, useNavigate} from "react-router-dom";
import { Button, useToast } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { EditIcon } from "@chakra-ui/icons";


export const ButtonsEvent = ({event}) => {

   // set up useNavigate hook
   const navigate = useNavigate();

   // pop-up message hook
   const toast = useToast();
 
   //Delete request
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
          size="sm"
          variant="ghost"
          leftIcon={<EditIcon />}
          _hover={{ bg: "#A5A726", color: "white" }}
        >
          Event
        </Button>
      </Link>
      <Button
        onClick={handleDelete}
        size="sm"
        variant="ghost"
        leftIcon={<DeleteIcon />}
        _hover={{ bg: "#803419", color: "white" }}
      >
        Event
      </Button>
    </>
  );
};
