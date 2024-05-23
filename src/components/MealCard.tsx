import { Divider, HStack, Icon, Text } from "native-base"
import { Entypo } from '@expo/vector-icons'
import { SelectTypes } from "./Select"

type Props = {
  meal: string  | null
  hour: string | null
  onDiet?: SelectTypes 
}

export function MealCard({ hour, meal, onDiet }: Props) {
  return (
    <HStack
      mb={4}
      h={69}
      px={6}
      borderWidth={1}
      rounded='lg'
      borderColor='gray.400'
      alignItems='center'
    >
      <Text fontSize='lg' fontFamily='heading'>
        {hour}
      </Text>

      <Divider
        orientation="vertical"
        mx={3}
        h={6}
      />
      
      <Text fontSize='xl' flex={1} numberOfLines={1}>
        {meal}
      </Text>

      <Icon
        as={Entypo}
        name="controller-record"
        size={7}
        color={onDiet === SelectTypes.ON_DIET ? 'green.600' : 'red.600'}
        ml={8}
      />
    </HStack>
  )
}