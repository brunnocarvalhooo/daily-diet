import { Button as NativeBaseButton, Text, IButtonProps, HStack } from "native-base";
import { ReactNode } from "react";

type Props = IButtonProps & {
  title: string
  variant?: 'contained' | 'outlined'
  icon?: ReactNode
  iconPosition?: 'start' | 'end' 
}

export function Button({ title, icon, iconPosition, variant = 'contained', ...rest }: Props) {
  return (
    <NativeBaseButton
      bg={variant === 'outlined' ? 'transparent' : "gray.600"}
      borderWidth={variant === 'outlined' ? 1 : 0}
      height="60"
      width="full"
      rounded='lg'

      _pressed={{
        bg: variant === 'outlined' ? "gray.300" : 'gray.700'
      }}

      {...rest}
    >
      <HStack alignItems='center'>
        {iconPosition === 'start' && icon}
        <Text
          color={variant === 'outlined' ? 'gray.700' : "white"}
          fontFamily="heading"
          fontSize="lg"
        >
          {title}
        </Text>
        {iconPosition === 'end' && icon}
      </HStack>
    </NativeBaseButton>
  )
}