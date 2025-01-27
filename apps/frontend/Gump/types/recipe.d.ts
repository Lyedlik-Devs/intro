type Recipe = {
  id: number
  title: string
  author: number
  image: number
  language: string
  serves: number
  categories: number[]
  tags: string[]
  ingredients: Ingredient[]
  steps: string[]
  viewCount: number
  isSaved: boolean
  saveCount: number
  isLiked: boolean
  likeCount: number
  referenceCount: number
  isArchived: boolean
  isOriginal: boolean
  originalRecipe: number
  isPrivate: boolean
  forks: number[]
  visibleTo: number[]
}

type Ingredient = {
  name: string
  value: number
  volume: string
  linkedRecipe: number // id of the recipe that this ingredient is linked to (0 if not linked)
}

type IngredientCreate = Omit<Ingredient, 'linkedRecipe'>

type SearchRecipe = Pick<
  Recipe,
  'id' | 'title' | 'author' | 'image' | 'viewCount' | 'saveCount' | 'likeCount' | 'isPrivate' | 'isLiked' | 'isSaved'
>
