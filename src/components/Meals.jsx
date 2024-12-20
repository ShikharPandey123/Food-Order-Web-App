import useHttp from "../hooks/useHttp.js";
import Error from "./Error.jsx";
import Meal from "./Meal.jsx";

const requestConfig = {};
export default function Meals() {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("https://food-order-web-app-2.onrender.com/meals", requestConfig, []);
  if (isLoading) {
    return <p className="center">Fetching meals...</p>;
  }
  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }
  console.log(loadedMeals);
  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <Meal key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
