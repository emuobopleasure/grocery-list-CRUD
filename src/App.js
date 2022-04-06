import { Box, Button, Center, Flex, Input, Text,} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ItemsList from './ItemsList';
import Notification from './Notification';


function App() {

  const getLocalStorage = () => {
    let newList = localStorage.getItem('groceryList')
    if (newList) {
      return JSON.parse(localStorage.getItem('groceryList'))
    }else {
      return []
    }
  }
  
  const [name, setName] = useState('')
  const [list, setList] = useState(getLocalStorage())
  const [isEditing, setIsEditing] = useState(false)
  const [editiID, setEditID] = useState(null)
  const [status, setStatus] = useState(
    {
      show: false,
      msg: '',
      type: ''
    }
  )
    
    // const getList = localStorage.getItem('groceryList') === null ? list : JSON.parse(localStorage.getItem('groceryList'))
    
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name) {
      setAlertMsg(true, 'Please input value', 'error')

    }else if (name && isEditing) {
      setList(list.map((item) => {
        if (item.id === editiID) {
          return {...item, title: name}
        }
        return item
      }))
      setName('')
      setEditID(null)
      setIsEditing(false)
      setAlertMsg(true, 'Value changed', 'success')

    }else {
      const newItems = {id: new Date().getTime().toString(), title: name}
      setList([...list, newItems])
      setAlertMsg(true, 'Item Added', 'success')
      setName('')
      localStorage.setItem('groceryList', JSON.stringify(list))
    }
  }

  const setAlertMsg = (show = false, msg = '', type = '') => {
    setStatus({show, msg, type})
  }
  
  const clearItems = () => {
    setAlertMsg(true, 'List cleared', 'error')
    setList([])
  }

  const removeItem = (id) => {
    const newList = list.filter((item) => item.id !== id)
    // console.log(list)
    setList(newList)
    setAlertMsg(true, 'Item deleted', 'error')
  }

  const editItem = (id) => {
    const edited = list.find((item) => item.id === id)
    setIsEditing(true)
    setEditID(id)
    setName(edited.title)
    console.log('fff', edited)
  }

  useEffect(() => {
    localStorage.setItem('groceryList', JSON.stringify(list))
  }, [list])

  return (
    <Box as = "main"  bg='gray.100'  mt='3rem' py='20px' rounded='10px' boxShadow='xl' maxW='45rem' mx={{ base: '10px', md: 'auto'}} px={{base: '20px', md: '40px'}}
    className="app"
    >
      <form onSubmit={handleSubmit}
        className='grocery-form'>
        <Text align='center' fontWeight='bold' color='gray.600' >
          Grocery Bud
        </Text>
        {status.show && 
        <Notification variant={status}
          setAlertMsg={setAlertMsg} list={list}
        />}
        <Flex my='1rem'>
          <Input value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder='e.g Eggs' size='sm'
          />
          <Button type='submit' bg='green.300' size='sm'>
            {isEditing ? 'Edit' : 'Submit'}
          </Button>
        </Flex>
      </form>
      <ItemsList
        removeItem={removeItem}
        list={list}
        editItem={editItem}
      />
      <Center>
        {list.length > 0 && <Button onClick={clearItems}
          color="red.300" p='4px' h='1.5rem' mt='2rem'
        >
          Clear Items
        </Button>}
      </Center>
    </Box>
  );
}

export default App;
