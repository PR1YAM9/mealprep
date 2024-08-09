'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { createClient } from '../../../utils/supabase/client'

export default function MealEdit() {
  const router = useRouter()
  const { id } = router.query
  const [meal, setMeal] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [newIngredient, setNewIngredient] = useState('')

  useEffect(() => {
    const getMeal = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('meals')
        .select('*')
        .eq('id', id)
        .single()
      if (!error) {
        setMeal(data)
        setName(data.name)
        setDescription(data.description)
        setImageUrl(data.imageUrl)
        setIngredients(data.ingredients || [])
      }
    }
    getMeal()
  }, [id])

  const handleNameChange = (e) => setName(e.target.value)
  const handleDescriptionChange = (e) => setDescription(e.target.value)
  const handleImageUrlChange = (e) => setImageUrl(e.target.value)
  const handleIngredientChange = (e) => setNewIngredient(e.target.value)
  const handleAddIngredient = () => {
    if (newIngredient.trim() !== '') {
      setIngredients([...ingredients, { name: newIngredient.trim() }])
      setNewIngredient('')
    }
  }
  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...ingredients]
    updatedIngredients.splice(index, 1)
    setIngredients(updatedIngredients)
  }

  const handleSaveMeal = async () => {
    const supabase = createClient()
    const { error } = await supabase
      .from('meals')
      .update({
        name,
        description,
        imageUrl,
        ingredients
      })
      .eq('id', id)
    if (!error) {
      router.push(`/meals/${meal.date.toDate().toISOString().slice(0, 10)}/${meal.mealType}`)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4 font-sans">
      {meal && (
        <div className="border-4 border-purple-200 rounded-lg p-6">
          <h1 className="text-4xl font-bold mb-4">Edit Meal</h1>
          <div className="mb-4">
            <label htmlFor="name" className="block font-semibold">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              className="border-b border-gray-400 focus:outline-none focus:border-purple-500 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block font-semibold">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              className="border-b border-gray-400 focus:outline-none focus:border-purple-500 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="imageUrl" className="block font-semibold">
              Image URL
            </label>
            <input
              type="text"
              id="imageUrl"
              value={imageUrl}
              onChange={handleImageUrlChange}
              className="border-b border-gray-400 focus:outline-none focus:border-purple-500 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="ingredients" className="block font-semibold">
              Ingredients
            </label>
            <div className="flex flex-wrap gap-2">
              {ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="bg-purple-200 text-purple-800 py-1 px-2 rounded-md flex items-center justify-between"
                >
                  {ingredient.name}
                  <button
                    onClick={() => handleRemoveIngredient(index)}
                    className="ml-2 text-purple-600 hover:text-purple-800"
                  >
                    &times;
                  </button>
                </div>
              ))}
              <div className="flex items-center">
                <input
                  type="text"
                  value={newIngredient}
                  onChange={handleIngredientChange}
                  className="border-b border-gray-400 focus:outline-none focus:border-purple-500 flex-1"
                />
                <button
                  onClick={handleAddIngredient}
                  className="bg-purple-600 text-white py-1 px-2 rounded-md hover:bg-purple-700 ml-2"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={handleSaveMeal}
            className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
          >
            Save
          </button>
        </div>
      )}
    </div>
  )
}