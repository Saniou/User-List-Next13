import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {FaSpinner} from 'react-icons/fa'

const UserPage = () => {
    const router = useRouter();
    const {id} = router.query;

    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://dummyjson.com/users/${id}`);
            const data = await response.json();
            setUser(data);
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    if (!user) {
        return (
            <div className="flex items-center justify-center h-screen">
                <FaSpinner className="animate-spin text-4xl text-gray-500"/>
            </div>
        )
    }

    return (
        <div className="flex text-center justify-center py-52">
            <div className="border shadow-lg shadow-white rounded-xl">
                <img src={user.image} alt={user.firstName}/>
            </div>
            <div>
                <h2 className="text-2xl pl-12 py-12">Name: {user.firstName + ' ' + user.lastName}</h2>
                <h2 className="text-2xl pl-12">UserName: {user.username}</h2>
                <h2 className="text-2xl pl-12">Email: {user.email}</h2>
            </div>
        </div>
    );
};

export default UserPage;