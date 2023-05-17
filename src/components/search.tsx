import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Select from 'react-select';

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await fetch(`https://dummyjson.com/users/?limit=100`);
      const res = await data.json();
      setUsers(res.users);
    };
    fetchUsers();
  }, []);

  const handleUserClick = (id) => {
    router.push(`/UserPage?id=${id}`);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const options = filteredUsers.map((user) => ({
    value: user.id,
    label: `${user.firstName} ${user.lastName}`,
  }));

  const handleSelectChange = (selectedOption) => {
    handleUserClick(selectedOption.value);
  };
  
  const selectStyles = {
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
    placeholder: (provided, state) => ({
      ...provided,
      color: 'white'
    }),
  };

  return (
    <div className="w-[50%] relative text-gray-600 mx-auto mb-8 my-2">
      <Select
        className="w-full"
        options={options}
        value={null}
        onChange={handleSelectChange}
        isSearchable
        filterOption={({ label }, input) =>
          label.toLowerCase().includes(input.toLowerCase())
        }
        styles={selectStyles}
      />
      <button type="submit" className="cursor-pointer absolute top-0 right-0 mt-3 mr-2">
      </button>
    </div>
  );
};