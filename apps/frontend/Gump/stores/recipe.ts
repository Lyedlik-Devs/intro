export const useRecipeStore = defineStore('recipe', {
  state: () => ({
    recipes: [] as Recipe[],
    ingredients: [] as Ingredient[],
    currentRecipe: null as Recipe | null,
  }),
  getters: {
    getEmptyIngredients(): Ingredient[] {
      return this.ingredients.filter(ingredient => ingredient.name === '' && !ingredient.value && ingredient.volume === '')
    },
  },
  actions: {
    async getRecipes() {},
    addEmptyIngredient() {
      this.ingredients.push({
        name: '',
        value: 0,
        volume: '',
        linkedRecipe: this.currentRecipe?.id ?? 0,
      })
    },
    checkEmptyIngredients() {
      if (this.getEmptyIngredients.length > 0) {
        this.getEmptyIngredients.forEach((ingredient) => {
          const index = this.ingredients.indexOf(ingredient)
          if (index > -1)
            this.ingredients.splice(index, 1)
        })
      }
    },
    addRecipe(recipeId: number) {
      this.ingredients.push({
        name: '',
        value: 0,
        volume: '',
        linkedRecipe: recipeId,
      })
    },
    async showRecipe(id: number) {
      const { data, error } = await gumpFetch(`recipe/${id}`, {
        headers: {},
        method: 'GET',
      })
      if (data.value)
        console.log('data', data.value)
      if (error.value) {
        console.log('error', error.value)
        return error.value
      }
    },

  },
  persist: true,
})
