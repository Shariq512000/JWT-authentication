import { Routes, Route, Link, Navigate } from "react-router-dom";

import Signup from "./component/signup";
import Login from "./component/login";
import Product from "./component/product";
import Contact from "./component/Contact";

import { useContext } from "react";
import { GlobalContext } from './context/Context';

import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import CircularProgress from '@mui/material/CircularProgress';


import { useState } from 'react';
import axios from 'axios';
import "./App.css";
import { useEffect } from "react";





const Search = styled('div')(({ theme }) => ({
   position: 'relative',
   borderRadius: theme.shape.borderRadius,
   backgroundColor: alpha(theme.palette.common.white, 0.15),
   '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
   },
   marginLeft: 0,
   width: '100%',
   [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
   },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
   padding: theme.spacing(0, 2),
   height: '100%',
   position: 'absolute',
   pointerEvents: 'none',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
   // onChange={
   // gettingProduct()
   // },
   color: 'inherit',
   '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
         width: '12ch',
         '&:focus': {
            width: '20ch',
         },
      },
   },
}));

function App() {
   let { state, dispatch } = useContext(GlobalContext);



   const logout = async () => {

      console.log('clicked')

      try {
         let response = await axios.post(`${state.baseUrl}/logout`, {} , {
            withCredentials: true
         });
         console.log('response: ' , response);
         dispatch({ type: 'USER_LOGOUT' });

      }
      catch (error) {

         console.log('error: ', error)

         dispatch({ type: 'USER_LOGIN' });
      }


   }

   let profileCheck = async () => {
      try {
         let response = await axios.get(`${state.baseUrl}/products`, {
            withCredentials: true
         })

         console.log("response: ", response);

         dispatch({
            type: 'USER_LOGIN'
         })
      } catch (error) {

         console.log("axios error: ", error);

         dispatch({
            type: 'USER_LOGOUT'
         })
      }
   }

   useEffect(() => {
      profileCheck()
   }, []);

   return (
      <div>
         <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
               <Toolbar>
                  <IconButton
                     size="large"
                     edge="start"
                     color="inherit"
                     aria-label="open drawer"
                     sx={{ mr: 2 }}
                  >
                     <MenuIcon />
                  </IconButton>
                  <Typography
                     variant="h6"
                     noWrap
                     component="div"
                     sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                  >
                     Shopping App
                  </Typography>
                  {
                     (state?.isLogin === false) ?
                        <ul className="nav">
                           <li>
                              <Link to={'/'}>Login</Link>
                           </li>
                           <li>
                              <Link to={'/signup'}>Signup</Link>
                           </li>
                        </ul>
                        :
                        null
                  }
                  {
                     (state?.isLogin === true) ?
                        <ul className="nav">
                           <li>
                              <Link to={'/'}>Home</Link>
                           </li>
                           <li>
                              <Link to={'/Contact'}>Contact</Link>
                           </li>
                        </ul>
                        :
                        null
                  }

                  {
                     (state.isLogin === true) ?
                        <IconButton onClick={() => {
                           logout()
                        }}><LogoutIcon /></IconButton>
                        :
                        null
                  }





               </Toolbar>
            </AppBar>
         </Box>
         {
            (state?.isLogin === false) ?
               <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="*" element={<Navigate to="/" replace={true}/>}/>
               </Routes>
               :
               null
         }
         {
            (state?.isLogin === true) ?
               <Routes>
                  <Route path="/" element={<Product />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="*" element={<Navigate to="/" replace={true}/>}/>
               </Routes>
               :
               null
         }
         {
            (state?.isLogin === null) ?
               <div style={{display: "flex" , justifyContent: 'center' , alignItem: 'center' , minHeight: '100%' , minWidth: '100%' , marginTop: "100px"  }}><CircularProgress size={400}/></div>
               :
               null
         }
      </div>
   );
}

export default App;

// function App(){

//    return(
//       <div>

//          <ul>
//             <li>
//                <Link to={'/'}>Login</Link>
//             </li>
//             <li>
//             <Link to={'/signup'}>Signup</Link>
//             </li>
//          </ul>

//          <Routes>
//             <Route path="/" element={<Login/>} />
//             <Route path="/signup" element={<Signup/>} />
//          </Routes>

//       </div>
//    )

// }

// export default App;
