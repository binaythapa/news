import { Avatar, Flex, Tag, TagLabel } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

interface Tag {
  id: string;
  name: string;
}

interface Props {
  tags: Tag[];
}

const TagDisplay = ({ tags }: Props) => {
  if (!tags) {
    return null;
  }
  return (
    <>
      <Flex alignItems={"stretch"} justifyContent={"center"}>
        {tags.map((tag) => (
          <Link to="/searchByTag" key={tag.id}>
            <Tag size="lg" m={5} bg="blue.500" borderRadius="full">
              <Avatar
                src="/avatar.png"
                size="xs"
                //   name="Segun Adebayo"
                ml={-1}
                mr={2}
              />
              <TagLabel color="white">{tag.name}</TagLabel>
            </Tag>
          </Link>
        ))}
      </Flex>
    </>
  );
};

export default TagDisplay;
