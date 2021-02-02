import React, { useState, createContext } from 'react'
import { useToast } from '@chakra-ui/react'

const ToastStateContext = createContext()
const ToastDispatchContext = createContext()

export function ToastProvider({ children }) {
  const [msg, setMsg] = useState(null)

  const setError = msg => setMsg({ ...msg, status: 'error' })

  React.useEffect(() => {
    if (!msg) return
    setTimeout(() => setMsg(null), msg.duration + 100)
  }, [msg])

  return (
    <ToastStateContext.Provider value={{ msg }}>
      <ToastDispatchContext.Provider value={{ setMsg, setError }}>
        {children}
      </ToastDispatchContext.Provider>
    </ToastStateContext.Provider>
  )
}

export const useToastState = () => {
  const context = React.useContext(ToastStateContext)
  if (context === undefined) {
    throw new Error('useCountState must be used within a CountProvider')
  }
  const toast = useToast()
  const { msg } = context
  return { msg, toast }
}
export const useToastDispatch = () => {
  const context = React.useContext(ToastDispatchContext)
  if (context === undefined) {
    throw new Error('useCountState must be used within a CountProvider')
  }
  return context
}

/**
 * * Usage:
* * Must wrap top level component with provider:
const { setMsg } = useToastDispatch()
<ToastProvider></ToastProvider>
setError({
      title: 'Welcome.',
      description: 'This is a test and can be triggered from anywhere',
      status: 'success',
      duration: 9000,
      isClosable: true,
      })
 */
