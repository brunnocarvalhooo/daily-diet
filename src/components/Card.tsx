import { Center, Heading, IBoxProps, Text } from "native-base"

type Props = IBoxProps & {
  type: 'default' | 'onDiet' | 'outDiet'
  title: string
  subtitle?: string
}

export function Card({ type, title, subtitle, ...rest }: Props) {
  return (
    <Center
      width='full'
      bg={type === 'onDiet' ? 'green.500' : type === 'outDiet' ? 'red.500' : 'gray.200'}
      rounded='lg'
      p={6}
      {...rest}
    >
      <Heading
        mb={2}
        fontSize='3xl'
      >
        {title}
      </Heading>

      <Text>{subtitle}</Text>
    </Center>
  )
}