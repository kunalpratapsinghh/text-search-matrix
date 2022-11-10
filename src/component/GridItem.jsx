import { Box, Flex} from "@chakra-ui/react";
import React from "react";
import BasicUsage from "./Modal";

const GridItem = ({ elem, handleinput }) => {
  return (
    <Box m="auto">
      <Flex
        minH="50px"
        minW={"50px"}
        border="2px solid grey"
        justifyContent={"center"}
        alignItems="center"
        borderRadius={"50%"}
        bg={elem.match?"red":"teal.100"}
      >
        <BasicUsage data={elem}  handleinput={handleinput}/>
      </Flex>
    </Box>
  );
};

export default GridItem;
