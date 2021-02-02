import React, { useState } from 'react'
import { Box, Button, Code } from '@chakra-ui/react'

export const Json = ({ data }) => {
  const [open, setOpen] = useState(false)

  React.useEffect(() => {
    setOpen(data ? true : false)
  }, [data])

  return (
    open && (
      <Box
        bg="blue"
        border="1px sold red"
      >
        <Button float="right"onClick={() => setOpen(false)}>
          X
        </Button>
        <Code>{JSON.stringify(data, null, 2)}</Code>
      </Box>
    )
  )
}
