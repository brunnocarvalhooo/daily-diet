import { Box, Center, HStack, Heading, Icon, Pressable, SectionList, Text, VStack } from 'native-base'

import LogoSvg from '@assets/logo.svg'
import ProfilePicSvg from '@assets/profile-pic.svg'
import { Feather, AntDesign } from '@expo/vector-icons'

import { Button } from '@components/Button'
import { TouchableOpacity } from 'react-native'
import { MealCard } from '@components/MealCard'
import { useCallback, useState } from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { getMeals } from '@storage/meal/getMeals'
import { SelectTypes } from '@components/Select'

export interface IMealDataProps {
  id: string,
  meal: string
  description?: string
  date: string
  hour: string
  onDiet?: SelectTypes
}

interface IMealsData {
  title: string
  data: IMealDataProps[]
}

export function Home() {
  const [meals, setMeals] = useState<IMealsData[] | []>([])
  const [porcentage, setPorcentage] = useState(0)

  const navigation = useNavigation()

  useFocusEffect(useCallback(() => {
    async function fetchMeals() {
      const result = await getMeals()

      let mealsFormatted: IMealsData[] = []

      mealsFormatted = result.reduce((acc, meal) => {
        const existingIndex = acc.findIndex(item => item.title === meal.date)
        if (existingIndex !== -1) {
          acc[existingIndex].data.push(meal)
        } else {
          acc.push({
            title: meal.date,
            data: [meal]
          })
        }
        return acc
      }, mealsFormatted)

      mealsFormatted.forEach(item => {
        item.data.sort((a, b) => {
          const hourA = parseInt(a.hour.replace(':', ''))
          const hourB = parseInt(b.hour.replace(':', ''))
          return hourB - hourA 
        })
      })

      setMeals(mealsFormatted)

      const totalMeals = result.length
      const totalOnDiet = result.reduce((acc, meal) => acc + (meal.onDiet === SelectTypes.ON_DIET ? 1 : 0), 0)

      const calculatedPercentage = (totalOnDiet / totalMeals) * 100

      const roundedPercentage = parseFloat(calculatedPercentage.toFixed(2))

      setPorcentage(roundedPercentage || 0)
    }

    fetchMeals()
  }, []))

  return (
    <VStack flex={1} bg='white'>
      <HStack justifyContent='space-between' mx={6} mb={8} mt={16}>
        <LogoSvg />

        {/* <TouchableOpacity>
          <ProfilePicSvg />
        </TouchableOpacity> */}
      </HStack>

      {porcentage !== 0 && (
        <Pressable onPress={() => navigation.navigate('statistics')}>
          <Box bg={porcentage === 0 ? 'gray.300' : porcentage >= 50 ? 'green.500' : 'red.500'} mx={6} mb={10} rounded='md'>
            <Icon
              as={Feather}
              name='arrow-up-right'
              alignSelf='flex-end'
              color={porcentage >= 50 ? 'green.700' : 'red.700'}
              size={6}
              mr={2}
              mt={2}
            />

            <Center pb={10}>
              <Heading fontSize='5xl'>
                {porcentage.toString().replace('.', ',')}%
              </Heading>

              <Text>das refeições dentro da dieta</Text>
            </Center>
          </Box>
        </Pressable>
      )}

      <Box mx={6} mb={10}>
        <Heading mb={4}>Refeições</Heading>

        <Button
          title='Nova refeição'
          iconPosition='start'
          onPress={() => navigation.navigate('newAndEditMeal', {
            isEditing: false
          })}
          icon={
            <Icon
              as={AntDesign}
              name='plus'
              size={6}
              color='white'
              mr={2}
            />
          }
        />
      </Box>

      <SectionList
        sections={meals}
        keyExtractor={(_, index) => index.toString()}
        renderSectionHeader={({ section: { title } }) => (
          <Box py={2}>
            <Text fontWeight="bold" fontSize='xl'>{title}</Text>
          </Box>
        )}
        renderItem={({ item }) => (
          <Pressable key={item.id} onPress={() => navigation.navigate('meal', {
            mealId: item.id
          })}>
            <MealCard key={item.id} meal={item.meal} hour={item.hour} onDiet={item.onDiet} />
          </Pressable>
        )}
        contentContainerStyle={meals.length === 0 ? { justifyContent: 'center' } : { paddingBottom: 100 }}
        ListEmptyComponent={
          <Center>
            <Text textAlign='center' fontSize='lg'>Você ainda não registrou nenhuma refeição.</Text>
            <Text textAlign='center' fontSize='md'>
              O que vamos comer hoje?
            </Text>
          </Center>
        }
        showsVerticalScrollIndicator={false}
        px={6}
      />
    </VStack>
  )
}