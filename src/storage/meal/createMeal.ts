import AsyncStorage from "@react-native-async-storage/async-storage";
import { IMealDataProps } from "@screens/Home";
import { MEAL_COLLECTION } from "@storage/storageConfig";
import { getMeals } from "./getMeals";

export async function createMeal(data: IMealDataProps) {
  try {
    const storagedMeals = await getMeals()

    await AsyncStorage.setItem(MEAL_COLLECTION, JSON.stringify(
      [...storagedMeals, data]
    ))
  } catch (error) {
    throw error
  }
}