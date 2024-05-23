import { Center, HStack, Heading, Icon, Modal, Pressable, Text, VStack } from "native-base";

import { AntDesign } from '@expo/vector-icons'
import { useCallback, useState } from "react";
import { IMealDataProps } from "./Home";
import { Entypo, FontAwesome } from '@expo/vector-icons'
import { Button } from "@components/Button";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { getMeal } from "@storage/meal/getMeal";
import { deleteMeal } from "@storage/meal/deleteMeal";
import { SelectTypes } from "@components/Select";

type RouteParams = {
  mealId: string
}

export function Meal() {
  const [openModal, setOpenModal] = useState(false)
  const [meal, setMeal] = useState<IMealDataProps | null>({
    id: '',
    meal: '',
    description: '',
    date: '',
    hour: '',
    onDiet: undefined
  })

  const navigation = useNavigation()

  const route = useRoute()
  const { mealId } = route.params as RouteParams

  async function handleDeleteMeal(id: string) {
    await deleteMeal(id)

    navigation.navigate('home')
  }

  useFocusEffect(useCallback(() => {
    async function fetchMeals() {
      const result = await getMeal(mealId)

      setMeal(result)
    }

    fetchMeals()
  }, []))

  return (
    <>
      {meal ? (
        <VStack
          flex={1}
          bg={meal.onDiet === SelectTypes.ON_DIET ? 'green.500' : 'red.500'}
        >
          <Center mt={16} mx={6}>
            <Pressable alignSelf='flex-start' onPress={() => navigation.goBack()}>
              <Icon
                as={AntDesign}
                name="arrowleft"
                size={8}
                color='gray.600'
                position='absolute'
              />
            </Pressable>


            <Heading>Refeição</Heading>
          </Center>

          <VStack
            h='full'
            bg='white'
            roundedTop='3xl'
            w='full'
            position='absolute'
            mt={130}
            px={6}
            pt={6}
          >
            <Heading fontSize='2xl' mt={4}>{meal.meal}</Heading>

            <Text mt={2}>{meal.description}</Text>

            <Heading fontSize='md' mt={8}>Data e hora</Heading>

            <Text mt={2}>{meal.date} às {meal.hour}</Text>

            <HStack justifyContent='center' rounded='full' alignItems='center' mt={8} bg='gray.200' w='40' p={2}>
              <Icon
                as={Entypo}
                name="controller-record"
                size={3}
                mr={2}
                color={meal.onDiet === SelectTypes.ON_DIET ? 'green.700' : 'red.700'}
              />

              <Text>{meal.onDiet === SelectTypes.ON_DIET ? 'dentro da dieta' : 'fora da dieta'}</Text>
            </HStack>

            <Button
              onPress={() => navigation.navigate('newAndEditMeal', {
                isEditing: true,
                mealId: meal.id
              })}
              title='Editar refeição'
              iconPosition='start'
              mt={510}
              icon={
                <Icon
                  as={AntDesign}
                  name="edit"
                  size={5}
                  color='white'
                  mr={4}
                />
              }
            />

            <Button
              onPress={() => setOpenModal(true)}
              title='Excluir refeição'
              variant='outlined'
              iconPosition='start'
              mt={4}
              icon={
                <Icon
                  as={FontAwesome}
                  name="trash-o"
                  size={5}
                  color='gray.700'
                  mr={4}
                />
              }
            />
          </VStack>

          <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Content h={250} w='90%'>
              <Center flex={1} mx={8}>
                <Text fontFamily='heading' fontSize='xl' textAlign='center'>Deseja realmente excluir o registro da refeição?</Text>
              </Center>

              <HStack px={4} pb={4} w='full' justifyContent='space-between'>
                <Button
                  onPress={() => setOpenModal(false)}
                  title='Cancelar'
                  variant='outlined'
                  w='48%'
                />

                <Button
                onPress={() => handleDeleteMeal(meal.id)}
                  title='Sim, exluir'
                  variant='contained'
                  w='48%'
                />
              </HStack>
            </Modal.Content>
          </Modal>
        </VStack>
      ) : (
        <HStack>
          <Heading>Refeição não encontrada</Heading>
        </HStack>
      )}

    </>

  )
}