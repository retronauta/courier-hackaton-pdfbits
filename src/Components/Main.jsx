import {
  Box,
  Heading,
  Container,
  Text,
  Stack,
  Input,
  HStack,
} from "@chakra-ui/react"

import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"
import { Worker } from "@react-pdf-viewer/core"

import { Viewer } from "@react-pdf-viewer/core"

import "@react-pdf-viewer/core/lib/styles/index.css"
import { useState } from "react"

export default function Main() {
  const [pdfFile, setPdfFile] = useState(null)

  const [pdfError, setPdfError] = useState("")

  const defaultLayoutPluginInstance = defaultLayoutPlugin()

  const handleFIle = e => {
    const allowedFiles = ["application/pdf"]

    let selectedFile = e.target.files[0]

    if (selectedFile) {
      if (selectedFile && allowedFiles.includes(selectedFile.type)) {
        let reader = new FileReader()

        reader.readAsDataURL(selectedFile)

        reader.onloadend = e => {
          setPdfError("")
          setPdfFile(e.target.result)
        }
      } else {
        setPdfError("not a valid PDF")
      }
    } else {
      console.log("Please select a PDF")
    }
  }

  return (
    <>
      <Box w="100%">
        <Stack as={Box} textAlign={"center"} py={10}>
          <Heading fontWeight={800} fontSize={72} lineHeight={"110%"} mb={30}>
            <Text
              as={"span"}
              bgGradient="linear(to-l, #9F25FF, #FF7A00)"
              bgClip="text"
              paddingBottom="100px"
              marginBottom="40px"
            >
              PDF Bites
            </Text>
          </Heading>
          <Text color={"gray.500"} fontSize={32}>
            Don't miss the highlights. Send the most important of what you are
            reading to your email.
          </Text>
        </Stack>

        <HStack h={20} justifyContent="space-arund">
          <Text w="40%">Upload your pdf</Text>
          <Input type="file" w="40%" onChange={handleFIle} />
          {pdfError && <Text color="red"> {pdfError}</Text>}
        </HStack>
        <Stack
          direction="row"
          w="100hv"
          justifyContent="space-around"
          h="100vh"
          px={20}
          gap={1}
        >
          <Box background="red" w="80%">
            {pdfFile && (
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.1.81/build/pdf.worker.min.js">
                <Viewer fileUrl={pdfFile}></Viewer>
              </Worker>
            )}

            {!pdfFile && <>No file is selected yet</>}
          </Box>
          <Box background="green" w="20%">
            chau
          </Box>
        </Stack>
      </Box>
    </>
  )
}
