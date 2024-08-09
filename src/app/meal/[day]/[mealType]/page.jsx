'use client';
import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { createClient } from '../../../../../utils/supabase/client'


export default function MealCreate() {

  const router = useRouter();
  const { day, mealType } = useParams(); // Extract day and mealType from params

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState('');

  const handleNameChange = (e) => setName(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleImageUrlChange = (e) => setImageUrl(e.target.value);
  const handleIngredientChange = (e) => setNewIngredient(e.target.value);

  const handleAddIngredient = () => {
    if (newIngredient.trim() !== '') {
      setIngredients([...ingredients, { name: newIngredient.trim() }]);
      setNewIngredient('');
    }
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  const handleCreateMeal = async () => {
    const supabase = createClient();
  
    try {
      const { data, error } = await supabase.auth.getUser();
      
      if (error) {
        console.error('Error fetching user:', error.message);
        return;
      }
      
      const user = data?.user;
  
      if (!user) {
        console.error('User not found or not authenticated');
        return;
      }
  
      console.log('User ID:', user.id); // Ensure this line is reached
      
      if (!day) {
        console.error('Day is required');
        return;
      }
    
      const response = await fetch(`/api/${day}/${mealType}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          day,
          mealType,
          name,
          description,
          imageUrl,
          ingredients,
          userId: user.id, // Ensure this matches your backend field
        }),
      });
    
      if (response.ok) {
        const result = await response.json();
        console.log('Meal created successfully:', result);
        router.push(`/meals/${day}/${mealType}`);
      } else {
        const errorData = await response.json();
        console.error('Error creating meal:', errorData.error);
        if (response.status === 401) {
          router.push('/login');
        }
      }
    } catch (error) {
      console.error('An error occurred while creating the meal:', error);
    }
  };
  
  
  

  return (
    <div className="max-w-4xl mx-auto p-4 font-sans">
      <div className="border-4 border-purple-200 rounded-lg p-6">
        <h1 className="text-4xl font-bold mb-4">Add Meal</h1>
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
          onClick={handleCreateMeal}
          className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
        >
          Create Meal
        </button>
      </div>
    </div>
  );
}
