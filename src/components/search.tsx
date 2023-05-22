import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const Select = dynamic(() => import('react-select'), { ssr: false });

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const router = useRouter();

  const fetchUsers = async (query) => {
    try {
      const response = await fetch(`https://dummyjson.com/users/search?q=${query}&limit=10`);
      const data = await response.json();
      setUsers(data.users);
      console.error(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers(searchQuery);
  }, [searchQuery]);

  const handleUserClick = (id) => {
    const selectedUser = users.find((user) => user.id === id);
    const firstName = selectedUser ? selectedUser.firstName : '';
    const lastName = selectedUser ? selectedUser.lastName : '';
    router.push(`/UserPage?id=${id}&UserName=${encodeURIComponent(firstName)}&${encodeURIComponent(lastName)}`);
  };

  const options = users.map((person) => ({
    value: person.id,
    label: `${person.firstName} ${person.lastName}`,
  }));

  const handleSelectChange = (selectedOption) => {
    if (selectedOption) {
      handleUserClick(selectedOption.value);
    } else {
      const encodedQuery = encodeURIComponent(searchQuery);
      router.push(`/404?q=${encodedQuery}`);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const selectedOption = options.find((option) => option.value === searchQuery);
      handleSelectChange(selectedOption);
    }
  };
  
  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: 'none',
      color: 'white',
      fontSize: '0.875rem',
      background: 'rgb(14 116 144)',
      borderRadius: '0.8rem',
      outline: 'none',
    }),
    option: (provided) => ({
      ...provided,
      color: 'white',
      background: 'rgb(14 116 144)',
      cursor: 'pointer',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'white'
    }),
  };

  return (
    <div className="w-[50%] relative text-gray-600 mx-auto mb-8 my-2">
      {typeof window !== 'undefined' && (
        <Select
          className="w-full"
          options={options}
          value={options.find((option) => option.value === searchQuery)}
          onChange={handleSelectChange}
          onInputChange={(value) => setSearchQuery(value)}
          onKeyDown={handleKeyDown}
          styles={customStyles}
        />
      )}
    </div>
  );
};