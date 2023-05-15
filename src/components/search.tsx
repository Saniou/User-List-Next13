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

  async function fetchData() {
    setLoading(true);
    const data = await fetch(`https://dummyjson.com/users?limit=100&search=${search}`, {
      method: 'GET',
    }).then((res) => res.json());
     setUser(data.users.find((u: Notice) => u.firstName  === search) || null);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [search]);

  return (
    <div className="w-[50%] relative text-gray-600 mx-auto mb-8 my-2">
      <input
        className="w-full border-none h-10 px-5 pr-10 text-white text-sm bg-cyan-500 border-2 border-gray-300 rounded-lg focus:outline-none"
        type="search"
        name="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
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
        <div >
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
