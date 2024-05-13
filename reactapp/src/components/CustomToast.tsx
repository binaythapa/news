import { useToast, UseToastOptions } from "@chakra-ui/react";

interface Props {
  messageStatus: UseToastOptions["status"];
  message: string;
}

const useCustomToast = () => {
  const toast = useToast();

  const displayToast = ({ messageStatus, message }: Props) => {
    toast({
      title: `${message}`,
      status: messageStatus,
      isClosable: true,
      position: "top",
      duration: 1200,
    });
  };

  return displayToast;
};

export default useCustomToast;
