import AsyncStorage from "@react-native-async-storage/async-storage";
import { IMealDataProps } from "@screens/Home";
import { MEAL_COLLECTION } from "@storage/storageConfig";
import { getMeals } from "./getMeals";
import { deleteMeal } from "./deleteMeal";
import { createMeal } from "./createMeal";

export async function updateMeal(data: IMealDataProps) {
  try {
    const storagedMeals = await getMeals();

    const existingMeal = storagedMeals.find(meal => meal.id === data.id);

    if (existingMeal) {
      await deleteMeal(existingMeal.id)
      
      await createMeal(data)
    } else {
      throw new Error("Refeição não encontrada para atualização.");
    }
  } catch (error) {
    throw error;
  }
}