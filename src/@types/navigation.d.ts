import { SelectTypes } from "@components/Select"

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined

      statistics: undefined

      newAndEditMeal: {
        mealId?: string
        isEditing: boolean
      }

      meal: {
        mealId: string
      }

      feedback: {
        isOnDiet: SelectTypes
      }
    }
  }
}