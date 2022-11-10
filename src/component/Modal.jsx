import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { useState } from "react";

function BasicUsage({data,handleinput}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [inputval,setInputVal]=useState(data.name)
    const handlechange=(e)=>{
        setInputVal(e.target.value)
    }
    return (
      <>
        <Button colorScheme='teal' variant='ghost' onClick={onOpen} color="grey">{data.name}</Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Change Element</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Input value={inputval}  onChange={handlechange}/>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant='ghost' onClick={()=>handleinput(inputval,data.id,onClose())}>Change</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }




  export default BasicUsage