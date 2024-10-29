import { useEffect, useState } from "react";
import fetchAvailableMeals from "../http.js";
import Meal from "./Meal.jsx";

export default function Meals({ children }) {
  const [meals, setMeals] = useState([]);
  useEffect(() => {
    async function getMeals() {
      try {
        const fetchedMeals = await fetchAvailableMeals();
        //console.log(fetchedMeals);
        setMeals(fetchedMeals);
      } catch (error) {
        //error fetching data...
      }
    }
    getMeals();
  }, []);
  return (
    <>
      <ul id="meals">
        {meals.map((meal) => (
          <li key={meal.id} className="meal-item">
            <Meal {...meal} />
          </li>
        ))}
      </ul>
    </>
  );
}
