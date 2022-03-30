import React, { useEffect } from 'react'
import { Alert, AlertIcon } from '@chakra-ui/react'

const Notification = ({variant, setAlertMsg, list}) => {
  console.log(variant)

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setAlertMsg()
    }, 3000)
    return () => clearTimeout(timeOut)
  }, [list])

  return (
    <div>
      {
        variant.type === 'success'?
        <Alert status='success' px='5rem' py='2px' >
          <AlertIcon/>
          {variant.msg}
        </Alert>
        :
        <Alert status='error' px='5rem' py='2px' >
          <AlertIcon/>
          {variant.msg}
        </Alert>
      }
    </div>
  )
}

export default Notification