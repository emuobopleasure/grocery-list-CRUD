import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { FiEdit, FiTrash2 } from 'react-icons/fi';


const ItemsList = ({list, removeItem, editItem}) => {
    console.log(list)
  return (
    <Box as='section'
        className=''
    >
        {
            list.map((item) => (
                <Flex key={item.id} as= 'article' justifyContent='space-between'>
                    <Text>
                    {item.title}
                    </Text>
                    <Flex
                    className='action-buttons'>
                        <Button onClick={() => editItem(item.id)}
                            className='edit-button'
                            px='0px' color='blue.600'>
                            <FiEdit/>
                        </Button>
                        <Button  onClick={()=> removeItem(item.id)}
                            className='delete-button'
                            px='0px' color='red.500'>
                            <FiTrash2/>
                        </Button>
                    </Flex>
                </Flex>
            ))
        }
    </Box>
  )
}

export default ItemsList