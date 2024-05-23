import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Statistics } from '@screens/Statistics'
import { Home } from '@screens/Home'
import { NewAndEditMeal } from '@screens/NewAndEditMeal'
import { Feedback } from '@screens/Feedback';
import { Meal } from '@screens/Meal';

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name='home'
        component={Home}
      />

      <Screen
        name='statistics'
        component={Statistics}
      />

      <Screen
        name='newAndEditMeal'
        component={NewAndEditMeal}
      />

      <Screen
        name='meal'
        component={Meal}
      />

      <Screen
        name='feedback'
        component={Feedback}
      />
    </Navigator>
  )
}