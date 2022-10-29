import {
    ChakraProvider,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
    extendTheme,
    Box
  } from "@chakra-ui/react";
  
const FloatingInput = ({ label, variant, size, controller, value }: any) => {
    return (
        <Box>
            <FormControl variant="floating" id="first-name">
                <Input width={{base: 'xs', lg: size}} placeholder=" " value={value} variant={variant} onChange={controller}/>
                {/* It is important that the Label comes after the Control due to css selectors */}
                <FormLabel>{label}</FormLabel>
            </FormControl>
        </Box>
    );
}

export default FloatingInput;
  