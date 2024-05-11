import React from "react";
import { Stack, Container, Input, Checkbox, Button } from "@chakra-ui/react";

const CategoryForm = () => {
  return (
    <>
      <Container>
        <Stack direction="column">
          <Input placeholder="Category" />
          <Checkbox colorScheme="blue">Is menu ?</Checkbox>
          <Button onClick={() => console.log("Clicked")} colorScheme="blue">
            Add Category
          </Button>
        </Stack>
      </Container>
    </>
  );
};

export default CategoryForm;
