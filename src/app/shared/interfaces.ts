export interface Recipe {
    id: number;
    title: string;
    preparationTime: number;
    cookingTime: number;
    difficulty: string;
    portions: number;
    ingredients: IngredientQuantity[];
    steps: Step[];
}

export interface Step {
    id: number;
    position: number;
    text: string;
}

export interface IngredientQuantity {
    id: number;
    quantity: number;
    ingredient: {id: number, name: string;};
    unit: Unit;
}

export interface Unit {
    id: number;
    label: string;
    slug: string;
}

export interface IngredientsQuantityDto {
    name: string;
    quantity: number;
    unit: string;
  }

export interface RecipeDto
  extends Omit<
    Recipe,
    | 'ingredients'
    | 'steps'
    | 'id'
    | 'createdDate'
    | 'updatedDate'
    | 'deletedDate'
  > {
  ingredients: IngredientsQuantityDto[];
  steps: Partial<Step>[];
}