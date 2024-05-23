import { Center, HStack, Heading, Icon, Pressable, Text, VStack, useToast } from "native-base";

import { AntDesign } from '@expo/vector-icons'
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Select, SelectTypes } from "@components/Select";
import { useCallback, useState } from "react";
import { TextArea } from "@components/TextArea";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { IMealDataProps } from "./Home";
import { createMeal } from "@storage/meal/createMeal";
import { dateChecker, timeChecker } from "@utils/checks";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { generateUniqueId } from "@utils/generateId";
import { getMeal } from "@storage/meal/getMeal";
import { updateMeal } from "@storage/meal/updateMeal";
import { format } from "date-fns";

type RouteParams = {
  mealId: string
  isEditing: boolean
}

export function NewAndEditMeal() {
  const [formData, setFormData] = useState<IMealDataProps>({
    id: '',
    meal: '',
    description: '',
    date: format(new Date(), 'dd/MM/yyyy'),
    hour: format(new Date(), 'HH:mm'),
    onDiet: undefined
  })

  const navigation = useNavigation()

  const toast = useToast()

  const route = useRoute()
  const { mealId, isEditing } = route.params as RouteParams

  async function handleCreateMeal() {
    if (!formData.meal) {
      return toast.show({
        title: 'Qual é o nome da nova refeição?',
        bg: 'red.700',
        placement: 'top',
        mr: 2,
      })
    }

    if (formData.onDiet === undefined) {
      return toast.show({
        title: 'A nova refeição está dentro da dieta?',
        bg: 'red.700',
        placement: 'top',
        mr: 2
      })
    }

    if (!dateChecker(formData.date)) {
      return toast.show({
        title: 'Formato de data inválido',
        description: 'Por favor, insira a data no formato DD/MM/YYYY',
        bg: 'red.700',
        placement: 'top',
        mr: 2
      })
    }

    if (!timeChecker(formData.hour)) {
      return toast.show({
        title: 'Formato de hora inválido',
        description: 'Por favor, insira a hora no formato HH:MM',
        bg: 'red.700',
        placement: 'top',
        mr: 2
      })
    }

    if (isEditing) {
      await updateMeal(formData)
    } else {
      await createMeal({ ...formData, id: generateUniqueId() })
    }

    navigation.navigate('feedback', {
      isOnDiet: formData.onDiet!
    })
  }

  function onChangeInput(
    e: NativeSyntheticEvent<TextInputChangeEventData>,
    value: keyof IMealDataProps
  ) {
    const inputValue = e.nativeEvent.text;

    setFormData({
      ...formData,
      [value]: inputValue
    });
  }

  useFocusEffect(useCallback(() => {
    async function fetchMeals() {
      if (isEditing) {
        const result = await getMeal(mealId)

        setFormData({
          id: result?.id || '',
          meal: result?.meal || '',
          description: result?.description || '',
          date: result?.date || '',
          hour: result?.hour || '',
          onDiet: result?.onDiet || undefined
        })
      }

    }

    fetchMeals()
  }, []))

  return (
    <VStack flex={1} bg='gray.300'>
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


        <Heading>{isEditing ? 'Editar refeição' : 'Nova refeição'}</Heading>
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
        <Input label="Nome" value={formData.meal} onChange={(e) => onChangeInput(e, 'meal')} />

        <TextArea label="Descrição" value={formData.description} totalLines={10} onChange={(e) => onChangeInput(e, 'description')} />

        <HStack justifyContent='space-between'>
          <Input label="Data" value={formData.date} w='50%' mr={2} placeholder="DD/MM/AAAA" onChange={(e) => onChangeInput(e, 'date')} />

          <Input label="Hora" value={formData.hour} w='50%' ml={2} placeholder="00:00" onChange={(e) => onChangeInput(e, 'hour')} />
        </HStack>

        <Text fontFamily='heading' fontSize='md' pt={4} pb={2}>
          Está dentro da dieta?
        </Text>

        <Select
          isActive={formData.onDiet}
          onPressNo={() => setFormData({ ...formData, onDiet: SelectTypes.OUT_DIET })}
          onPressYes={() => setFormData({ ...formData, onDiet: SelectTypes.ON_DIET })}
        />

        <Button title={isEditing ? 'Salvar alterações' : "Cadastrar refeição"} mt={300} onPress={handleCreateMeal} />
      </VStack>
    </VStack>
  )
}