// AuthContext.js 
// import { useContext,createContext,useState,useEffect } from "react";

// const AuthContext = createContext();

// const AuthContextProvider = ({children}) => {
//     const [user, setUser] = useState("Amin");  
//     return(
//         <AuthContext.Provider value={{user,setUser}}>
//             {children}  
//         </AuthContext.Provider>
//     )
// }

// const useAuth = ( ) => {

//     const context = useContext(AuthContext);
//     if (!context) {
//       throw new Error('useAuth must be used within an AuthProvider');
//     }
//     return context;
//   };

// export {AuthContextProvider, useAuth};