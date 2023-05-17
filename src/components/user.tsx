import Link from "next/link"

 export const Users = ({firstName, lastName, image, id}) => {
    return(
        <div className="text-center border-solid border-2 border-sky-500 w-[80%] rounded-xl shadow-lg shadow-blue-500/50 hover:bg-slate-500">
            <Link href={`/SearchPage/${id}`}>
            <img className="" src={image} alt={firstName + lastName} />
            <h1>{firstName}</h1>
            <h1>{lastName}</h1>
            </Link>
        </div>
    )
}