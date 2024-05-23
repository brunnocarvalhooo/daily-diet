import { Button } from "@components/Button";
import { Center, Heading, Text } from "native-base";
import { useState } from "react";

import OnDietIllustrationSvg from '@assets/onDiet-Illustration.svg'
import OutDietIllustrationSvg from '@assets/outDiet-illustration.svg'
import { useNavigation, useRoute } from "@react-navigation/native";
import { SelectTypes } from "@components/Select";

type RouteParams = {
  isOnDiet: SelectTypes
}

export function Feedback() {
  const navigation = useNavigation()

  const route = useRoute()
  const { isOnDiet } = route.params as RouteParams

  return (
    <Center flex={1} >
      <Heading
        color={isOnDiet === SelectTypes.ON_DIET ? 'green.700' : 'red.700'}
        fontSize='3xl'
        mb={4}
        mx={6}
      >
        {isOnDiet === SelectTypes.ON_DIET ?
          'Continue assim!' : 'Que pena!'
        }
      </Heading>

      <Text mb={8} mx={6} textAlign='center'>
        {isOnDiet === SelectTypes.ON_DIET ?
          <>
            Você continua <Text fontFamily='heading'>dentro da dieta.</Text> Muito bem!
          </>
          :
          <>
            Você <Text fontFamily='heading'>saiu da dieta</Text> dessa vez, mas continue se esforçando e não desista!
          </>

        }
      </Text>

      {isOnDiet === SelectTypes.ON_DIET ?
        (<OnDietIllustrationSvg />) : (<OutDietIllustrationSvg />)
      }

      <Button title="Ir para a página inicial" w={300} mt={8} onPress={() => navigation.navigate('home')} />
    </Center>
  )
}