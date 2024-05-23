import { HStack, Icon, Pressable, Text } from "native-base";
import { Entypo } from '@expo/vector-icons'

export enum SelectTypes {
  ON_DIET = 'onDiet',
  OUT_DIET = 'outDiet',
  NONE = ''
}

type Props = {
  isActive?: SelectTypes
  onPressNo: () => void
  onPressYes: () => void
}

export function Select({ isActive, onPressNo, onPressYes }: Props) {
  return (
    <HStack justifyContent='space-between'>
      <Pressable w='50%' onPress={onPressYes}>
        <HStack
          justifyContent='center'
          rounded='lg'
          borderWidth={1}
          borderColor={isActive === SelectTypes.NONE ? 'gray.200' : isActive === SelectTypes.ON_DIET ? 'green.700' : 'gray.200'}
          bg={isActive === SelectTypes.NONE ? 'gray.200' : isActive === SelectTypes.ON_DIET ? 'green.500' : 'gray.200'}
          alignItems='center'
          h={60}
          mr={2}
        >
          <Icon
            as={Entypo}
            name="controller-record"
            size={3}
            mr={2}
            color='green.700'
          />

          <Text fontFamily='heading'>Sim</Text>
        </HStack>
      </Pressable>


      <Pressable w='50%' onPress={onPressNo}>
        <HStack
          justifyContent='center'
          rounded='lg'
          borderWidth={1}
          borderColor={isActive === SelectTypes.NONE ? 'gray.200' : isActive === SelectTypes.OUT_DIET ? 'red.700' : 'gray.200'}
          bg={isActive === SelectTypes.NONE ? 'gray.200' : isActive === SelectTypes.OUT_DIET ? 'red.500' : 'gray.200'}
          alignItems='center'
          h={60} 
          ml={2}
        >
          <Icon
            as={Entypo}
            name="controller-record"
            size={3}
            mr={2}
            color='red.700'
          />

          <Text fontFamily='heading'>Não</Text>
        </HStack>
      </Pressable>
    </HStack>

  )
}