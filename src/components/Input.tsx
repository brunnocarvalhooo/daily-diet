import { Box, IInputProps, Input as NativeBaseInput, Text } from "native-base"

type Props = IInputProps & {
  label: string
  w?: string
}

export function Input({ label, w = 'full', ...rest }: Props) {
  return (
    <Box py={4} w={w}>
      <Text fontFamily='heading' fontSize='md' pb={2}>{label}</Text>
      
      <NativeBaseInput  rounded='lg' fontSize='lg' _focus={{
        borderColor: 'gray.600',
        bg: 'white'
      }} {...rest}/>
    </Box>
  )
}