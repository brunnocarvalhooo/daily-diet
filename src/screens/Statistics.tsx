import { Box, Center, HStack, Heading, Icon, Pressable, Text, VStack } from "native-base";

import { AntDesign } from '@expo/vector-icons'
import { Card } from "@components/Card";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getMeals } from "@storage/meal/getMeals";
import { useCallback, useState } from "react";
import { IMealDataProps } from "./Home";
import { SelectTypes } from "@components/Select";

export function Statistics() {
  const [meals, setMeals] = useState<IMealDataProps[] | []>([])
  const [porcentage, setPorcentage] = useState(0)

  const navigation = useNavigation()

  const onDietMeals = meals.filter((meal) => meal.onDiet === SelectTypes.ON_DIET)
  const outDietMeals = meals.filter((meal) => meal.onDiet === SelectTypes.OUT_DIET)

  useFocusEffect(useCallback(() => {
    async function fetchMeals() {
      const result = await getMeals()

      setMeals(result)

      const totalMeals = result.length;
      const totalOnDiet = result.reduce((acc, meal) => acc + (meal.onDiet === SelectTypes.ON_DIET ? 1 : 0), 0);

      const calculatedPercentage = (totalOnDiet / totalMeals) * 100;

      const roundedPercentage = parseFloat(calculatedPercentage.toFixed(2));

      setPorcentage(roundedPercentage || 0);
    }

    fetchMeals()
  }, []))

  return (
    <VStack flex={1}>
      <Center
        pt={16}
        px={6}
        bg={porcentage >= 50 ? 'green.500' : 'red.500'}
      >
        <Pressable alignSelf='flex-start' onPress={() => navigation.goBack()}>
          <Icon
            as={AntDesign}
            name="arrowleft"
            size={8}
            color={porcentage >= 50 ? 'green.700' : 'red.700'}
          />
        </Pressable>

        <Heading fontSize='5xl'>
          {porcentage.toString().replace('.', ',')}%
        </Heading>

        <Text mb='full'>das refeições dentro da dieta</Text>
      </Center>

      <VStack
        h='full'
        bg='white'
        roundedTop='3xl'
        w='full'
        position='absolute'
        mt={230}
      >
        <Center mx={6}>
          <Text
            alignSelf='center'
            mt={8}
            fontFamily='heading'
            fontSize='lg'
            mb={8}
          >
            Estatísticas gerais
          </Text>

          {/* <Card
            type="default"
            title={longestSequence.toString()}
            subtitle="melhor sequência de pratos dentro da dieta"
            px={6}
            mb={4}
          /> */}

          <Card
            type="default"
            title={meals.length.toString()}
            subtitle="refeições registradas"
            px={6}
            mb={4}
          />

          <HStack justifyContent='space-between' px={2}>
            <Card
              type="onDiet"
              title={onDietMeals.length.toString()}
              subtitle="refeições dentro da dieta"
              w='50%'
              mr={2}
            />

            <Card
              type="outDiet"
              title={outDietMeals.length.toString()}
              subtitle="refeições fora da dieta"
              w='50%'
              ml={2}
            />
          </HStack>
        </Center>
      </VStack>
    </VStack>
  )
}