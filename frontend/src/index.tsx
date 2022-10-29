import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import * as React from "react"
import * as ReactDOM from "react-dom/client"
import { App } from "./App"
import reportWebVitals from "./reportWebVitals"
import * as serviceWorker from "./serviceWorker"
import { chains, providers } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import theme from "./theme"

const container = document.getElementById("root")
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container)

const config: {projectId: string, theme: 'dark', accentColor: any, ethereum: any} = {
  projectId: '6395ac3ec192d9e310fdd75538b8b33a',
  theme: "dark",
  accentColor: "teal",
  ethereum: {
    appName: 'web3Modal',
    autoConnect: true,
    chains: [
      chains.goerli
    ],
    providers: [providers.walletConnectProvider({ projectId: '6395ac3ec192d9e310fdd75538b8b33a' })]
  },
};

root.render(
  <React.StrictMode>
    <Web3Modal config={config} />
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.register()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

