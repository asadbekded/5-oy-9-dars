import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ( {children} ) => {
   const localMeData = JSON.parse(localStorage.getItem("me"))
   const [ me, setMe ] = useState(localMeData)

   useEffect(() => {
      if(me) {
         localStorage.setItem("me", JSON.stringify(me))
      }else{
         localStorage.removeItem("me")
      }
      console.log(me);
   }, [me])

   return(
      <UserContext.Provider value={{ me, setMe }}>
        {children}
      </UserContext.Provider>
   )
}

