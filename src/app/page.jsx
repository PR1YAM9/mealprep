import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex align-middle justify-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2 flex flex-col align-middle justify-center">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Effortless Meal Planning for a Healthier You
                </h1>
                <div className="flex justify-center align-middle">
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Take the guesswork out of meal planning with our powerful
                    app. Create personalized meal plans, generate grocery lists,
                    and access a vast database of delicious recipes.
                  </p>
                </div>
              </div>
              <div className="flex justify-center align-middle flex-col gap-2 min-[400px]:flex-row">
                <Link href={"/mealplanner"}>
                  <button className="inline-flex border h-10 items-center justify-center rounded-md border-input px-8 bg-green-300 text-sm font-medium shadow-sm transition-colors hover:bg-green-400 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                    Start Planning
                  </button>
                </Link>
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
