import { Box, ITextAreaProps, TextArea as NativeBaseTextArea, Text } from "native-base"

type Props = ITextAreaProps & {
  label: string
  w?: string
  totalLines: number
}

export function TextArea({ label, w = 'full', totalLines, ...rest }: Props) {
  return (
    <Box py={4} w={w}>
      <Text fontFamily='heading' fontSize='md' pb={2}>{label}</Text>

      <NativeBaseTextArea
        rounded='lg'
        fontSize='lg'
        h="32"
        _focus={{
          borderColor: 'gray.600',
          bg: 'white'
        }}
        autoCompleteType="off"
        numberOfLines={totalLines}
        totalLines={totalLines}
        {...rest}
      />
    </Box>
  )
}