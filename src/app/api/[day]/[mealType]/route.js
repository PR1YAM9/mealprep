import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    // Extract URL and query parameters

    // Extract request body
    const { name, description, imageUrl, ingredients, userId ,day,mealType} = await req.json();

    console.log('day',day);
    console.log('mealType',mealType);
    
    if (!day || !mealType) {
      return new Response('Day and mealType are required', { status: 400 });
    }

    if (!userId) {
      return new Response('User ID is required', { status: 400 });
    }

    const meal = await prisma.meal.create({
      data: {
        name,
        description,
        imageUrl,
        date: new Date(), 
        mealType, 
        userId, 
        ingredients: {
          create: ingredients.map((ingredient) => ({
            ingredient: {
              connectOrCreate: {
                where: { name: ingredient.name },
                create: { name: ingredient.name },
              },
            },
          })),
        },
      },
      include: {
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    });

    return new Response(JSON.stringify(meal), { status: 200 });
  } catch (error) {
    console.error('Error creating meal:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}



export async function GET(req, { params }) {
  const { dayOfWeek, mealType } = params;

  const supabase = createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = user.id;

  try {
    const meals = await prisma.meal.findMany({
      where: {
        dayOfWeek, // Use dayOfWeek instead of date
        userId,
        mealType,
      },
      include: {
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    });

    return NextResponse.json(meals);
  } catch (error) {
    console.error('Error fetching meals:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function PUT(req, { params }) {
  const { id } = params;
  const { name, description, imageUrl, ingredients } = await req.json();

  const supabase = createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = user.id;

  try {
    const meal = await prisma.meal.update({
      where: { id, userId },
      data: {
        name,
        description,
        imageUrl,
        ingredients: {
          deleteMany: {},
          create: ingredients.map((ingredient) => ({
            ingredient: {
              connectOrCreate: {
                where: { name: ingredient.name },
                create: { name: ingredient.name },
              },
            },
          })),
        },
      },
      include: {
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    });

    return NextResponse.json(meal);
  } catch (error) {
    console.error('Error updating meal:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}