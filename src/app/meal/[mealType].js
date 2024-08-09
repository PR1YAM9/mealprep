'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { createClient } from '../../../utils/supabase/client'

export default function MealDetail() {
  const router = useRouter()
  const { day, mealType } = router.query.slug
  const [meal, setMeal] = useState(null)

  useEffect(() => {
    const getMeal = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('meals')
        .select('*')
        .eq('date', new Date(day).toISOString())
        .eq('mealType', mealType)
        .limit(1)
        .single()
      if (!error) {
        setMeal(data)
      }
    }
    getMeal()
  }, [day, mealType])

  const handleEditMeal = () => {
    router.push(`/meals/${meal.id}/edit`)
  }

  const handleAddMeal = () => {
    router.push(`/meals/${day}/${mealType}/create`)
  }

  return (
    <div className="max-w-4xl mx-auto p-4 font-sans">
      {meal ? (
        <div className="border-4 border-purple-200 rounded-lg p-6">
          <h1 className="text-4xl font-bold mb-4">{meal.name}</h1>
          {meal.imageUrl && (
            <img src={meal.imageUrl} alt={meal.name} className="w-full h-64 object-cover mb-4 rounded-lg" />
          )}
          <p className="text-gray-700 mb-4">{meal.description}</p>
          <button
            onClick={handleEditMeal}
            className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
          >
            Edit
          </button>
        </div>
      ) : (
        <div className="border-4 border-purple-200 rounded-lg p-6">
          <h1 className="text-4xl font-bold mb-4">No meal found</h1>
          <button
            onClick={handleAddMeal}
            className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
          >
            Add Meal
          </button>
        </div>
      )}
    </div>
  )
}