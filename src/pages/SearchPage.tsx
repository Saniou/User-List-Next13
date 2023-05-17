const SearchPage = () => {
    return ( 
        <div>
            Hello user
        </div>
     );
}
 
export default SearchPage;

// const UserInfo = async ({params}) => {
//     const {user} = params
//     const data = await fetch(`https://dummyjson.com/users/${user}`)
//     const res = await data.json()
  
//     return (
//       <>
//       <div className="flex text-center justify-center py-52">
//       <div className="border shadow-lg shadow-white rounded-xl">
//           <img src={res.image} alt={res.firstName} />
//       </div>
//       <div>
//        <h2 className="text-2xl pl-12 py-12">Name: {res.firstName + " " + res.lastName}</h2>
//        <h2 className="text-2xl pl-12">UserName: {res.username}</h2>
//        <h2 className="text-2xl pl-12">Email: {res.email}</h2>
//       </div>
//       </div>
//       </>
//     );
//   }
  
//   export default UserInfo