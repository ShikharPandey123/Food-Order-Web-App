export default async function fetchAvailableMeals(){
    const response = await fetch('https://food-order-web-app-2.onrender.com/meals')
    const resData= await response.json();
    if(!response.ok){
        throw new Error('Failed to fetch places');
    }
    return resData;
}
