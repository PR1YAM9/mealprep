'use client'
import React, { useState } from 'react';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const mealTypes = ['Breakfast', 'Snack', 'Lunch', 'Snack', 'Dinner'];

export default function MealPlanner() {
  const [weekOf, setWeekOf] = useState('');

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
                {mealTypes.map((_, mealIndex) => (
                  <td key={mealIndex} className="border border-purple-200 h-12">
                    <input type="text" className="w-full h-full px-1 focus:outline-none focus:bg-purple-50" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}