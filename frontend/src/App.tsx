import React, { useEffect } from "react"
import {
  Box,
} from "@chakra-ui/react"
import { Outlet } from 'react-router-dom';
import Navbar from "./components/Navbar";

export const App = () => {
  return ( 
    <Box textAlign="center" fontSize="xl">
      <Navbar/>
      <Outlet/>
    </Box>
  )
}
