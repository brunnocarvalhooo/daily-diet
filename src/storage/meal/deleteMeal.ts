import AsyncStorage from "@react-native-async-storage/async-storage";
import { getMeals } from "./getMeals";
import { MEAL_COLLECTION } from "@storage/storageConfig";

export async function deleteMeal(id: string) {
  try {
    let storagedMeals = await getMeals();

    storagedMeals = storagedMeals.filter(meal => meal.id !== id);

    await AsyncStorage.setItem(MEAL_COLLECTION, JSON.stringify(
      storagedMeals
    ))
  } catch (error) {
    throw error;
  }
}