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
      const response = await fetch(`/api/users?q=${query}`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers(searchQuery);
  }, [searchQuery]);

  const handleUserClick = (id) => {
    router.push(`/UserPage?id=${id}`);
  };

  const options = users.map((user) => ({
    value: user.id,
    label: `${user.firstName} ${user.lastName}`,
  }));

  const handleSelectChange = (selectedOption) => {
    handleUserClick(selectedOption.value);
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
          isSearchable
          styles={customStyles}
        />
      )}
    </div>
  );
};