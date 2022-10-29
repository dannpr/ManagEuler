import React from "react"
import {
  VStack,
  Heading,
} from "@chakra-ui/react"
import "@fontsource/volkhov"

export const Landing = () => {

  return ( 
      <VStack h={'90vh'} flexGrow={1} w='full' justifyContent={'center'} alignItems={'center'} spacing={3}>
            <>
              <Heading size={'4xl'} fontFamily={'volkhov'}>ManagEuler</Heading>
              <Heading fontFamily={'volkhov'}>Earn yield on unused collateral</Heading>
            </>
      </VStack>
  )
}
