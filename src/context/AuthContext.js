import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ( {children} ) => {
   const localTokenData = JSON.parse(localStorage.getItem("token"))
   
   const [ token, setToken ] = useState(localTokenData)

   useEffect(() => {
      if(token) {
         localStorage.setItem("token", JSON.stringify(token))
      }else{
         localStorage.removeItem("token")
      }
      console.log(token);
   }, [token])

   return(
      <AuthContext.Provider value={{ token, setToken }}>
        {children}
      </AuthContext.Provider>
   )
}