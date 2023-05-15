import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Users } from './user';

type Notice = {
  id: string;
  firstName: string;
  lastName: string;
  image: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
};

export const SearchUser = () => {
  const [user, setUser] = useState<Notice | null>(null);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [suggestedUsers, setSuggestedUsers] = useState<Notice[]>([]);

  async function fetchData() {
    setLoading(true);
    const data = await fetch(`https://dummyjson.com/users?limit=100`, {
      method: 'GET',
    }).then((res) => res.json());
  
    const [firstName, lastName] = search.split(' ');
  
    const filteredUsers = data.users.filter((u: Notice) => {
      const firstNameMatch = firstName && u.firstName.toLowerCase() === firstName.toLowerCase();
      const lastNameMatch = lastName && u.lastName.toLowerCase() === lastName.toLowerCase();
      return firstNameMatch || lastNameMatch;
    });
  
    setUser(filteredUsers.length > 0 ? filteredUsers[0] : null);
    setLoading(false);
  }
  

  async function fetchSuggestedUsers() {
    const data = await fetch(`https://dummyjson.com/users?limit=100`, {
      method: 'GET',
    }).then((res) => res.json());
    setSuggestedUsers(data.users);
  }

  useEffect(() => {
    fetchData();
  }, [search]);

  useEffect(() => {
    fetchSuggestedUsers();
  }, []);

  return (
    <div className="w-[50%] relative text-gray-600 mx-auto mb-8 my-2">
      <input
        className="w-full border-none h-10 px-5 pr-10 text-white text-sm bg-cyan-500 border-2 border-gray-300 rounded-lg focus:outline-none"
        type="search"
        name="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        list="suggestedUsers"
      />
      <datalist id="suggestedUsers">
        {suggestedUsers.map((user) => (
          <option key={user.id} value={`${user.firstName} ${user.lastName}`} />
        ))}
      </datalist>
      <button
        type="submit"
        className="cursor-pointer absolute top-0 right-0 mt-3 mr-2"
        onClick={fetchData}
      >
        <FaSearch />
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <div className='justify-center items-center mt-8 w-[40%] ml-[30%]'>
          <Users
            key={user.id}
            id={user.id}
            firstName={user.firstName}
            lastName={user.lastName}
            image={user.image}
            age={user.age}
            gender={user.gender}
            email={user.email}
            phone={user.phone}
            username={user.username}
          />
        </div>
      ) : (
        <p>No results found for "{search}".</p>
      )}
    </div>
  );
};