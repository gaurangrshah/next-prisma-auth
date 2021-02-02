import React, { useState, useEffect, createContext } from 'react'

const NavStateContext = createContext()
const NavDispatchContext = createContext()

export function NavProvider({ children }) {
  const [nav, setNav] = useState(() => ({
    pages: [],
    controls: [],
  }))

  // useEffect(() => {
  //   if (!nav?.pages?.length) return
  //   console.log(nav.pages)
  // }, [nav?.pages])

  const updatePages = pages => setNav(prevState => ({ ...prevState, pages }))
  const updateControls = controls =>
    setNav(prevState => ({ ...prevState, controls }))

  return (
    <NavStateContext.Provider value={{ nav }}>
      <NavDispatchContext.Provider value={{ updatePages, updateControls }}>
        {children}
      </NavDispatchContext.Provider>
    </NavStateContext.Provider>
  )
}

export const useNavState = () => {
  const context = React.useContext(NavStateContext)
  if (context === undefined) {
    throw new Error('useNavState must be used within a NavProvider')
  }
  return context
}

export const useNavDispatch = () => {
  const context = React.useContext(NavDispatchContext)
  if (context === undefined) {
    throw new Error('useNavState must be used within a NavProvider')
  }
  return context
}
