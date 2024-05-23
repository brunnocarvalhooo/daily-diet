import { getMeals } from "./getMeals";

export async function getMeal(id: string) {
  try {
    const storagedMeals = await getMeals()

    const foundMeal = storagedMeals.find(meal => meal.id === id);

    return foundMeal || null
  } catch (error) {
    throw error;
  }
}