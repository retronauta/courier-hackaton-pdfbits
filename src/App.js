import { ChakraProvider } from "@chakra-ui/react"
import Main from "./Components/Main"

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <Main />
      </ChakraProvider>
    </div>
  )
}

export default App
