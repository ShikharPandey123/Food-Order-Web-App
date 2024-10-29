export default async function fetchAvailableMeals(){
    const response = await fetch('http://localhost:4000/meals')
    const resData= await response.json();
    if(!response.ok){
        throw new Error('Failed to fetch places');
    }
    return resData;
}
// export async function fetchOrders(){
//     const response = await fetch('http://localhost:4000/orders')
//     const resData= await response.json();
//     if(!response.ok){
//         throw new Error('Failed to fetch orders');
//     }
//     return resData.orders;
// }
// export async function updateOrders(places){
//     const response=await fetch('http://localhost:4000/orders',{
//         method: 'PUT',
//         body: JSON.stringify({places}),
//         headers:{
//             'Content-Type':'application/json',
//         }
//     });
//     const resData=await response.json();
//     if(!response.ok){
//         throw new Error("Failed to update user data");
//     }
//     return resData.message;
// }