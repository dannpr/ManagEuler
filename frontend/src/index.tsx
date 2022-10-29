import { ChakraProvider } from "@chakra-ui/react"
import * as React from "react"
import * as ReactDOM from "react-dom/client"
import theme from "./theme"
import { RouterProvider } from "react-router-dom";
import FullSpinner from './components/Spinner';
import router from "./Router"


const container = document.getElementById("root")
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container)

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider
        router={router}
        fallbackElement={<FullSpinner/>}
      />
    </ChakraProvider>
  </React.StrictMode>,
)
