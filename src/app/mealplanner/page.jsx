'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../../utils/supabase/client'

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const mealTypes = ['Breakfast', 'Snack', 'Lunch', 'Snack', 'Dinner']

export default function MealPlanner() {
  const [weekOf, setWeekOf] = useState('')
  const [meals, setMeals] = useState([])
  const router = useRouter();

  useEffect(() => {
    const getMeals = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.auth.getUser()
      if (data.user) {
        const { data: mealsData, error: mealsError } = await supabase
          .from('meals')
          .select('*')
          .eq('userId', data.user.id)
        if (!mealsError) {
          setMeals(mealsData)
        }
      }
    }
    getMeals()
  }, [])

  const handleMealClick = (day, mealType) => {
    router.push(`/meal/${day}/${mealType}`)
  }

  return (
    <div className="max-w-4xl mx-auto p-4 font-sans">
      <div className="border-4 border-purple-200 rounded-lg p-6">
        <h1 className="text-4xl font-bold text-center mb-4">7-Day Meal Planner</h1>
        <div className="mb-4">
          <label htmlFor="weekOf" className="font-semibold">For the week of: </label>
          <input
            type="text"
            id="weekOf"
            value={weekOf}
            onChange={(e) => setWeekOf(e.target.value)}
            className="border-b border-gray-400 focus:outline-none focus:border-purple-500"
          />
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="w-1/6"></th>
              {mealTypes.map((type, index) => (
                <th key={index} className="w-1/6 py-2 px-1 text-purple-600 font-normal italic">
                  {type}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map((day, index) => (
              <tr key={index}>
                <td className={`py-2 px-1 ${index % 2 === 0 ? 'bg-purple-400' : 'bg-purple-300'} text-white font-semibold`}>
                  <div className="transform -skew-x-12">{day}</div>
                </td>
                {mealTypes.map((mealType, mealIndex) => (
                  <td
                    key={mealIndex}
                    className="border border-purple-200 h-12 cursor-pointer"
                    onClick={() => handleMealClick(day, mealType)}
                  >
                    {/* Display the meal name or a placeholder */}
                    <div className="w-full h-full px-1 flex items-center justify-center">
                      {meals.find((meal) => meal.date.toDate().toDateString() === new Date(day).toDateString() && meal.mealType === mealType)?.name || 'Meal'}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}