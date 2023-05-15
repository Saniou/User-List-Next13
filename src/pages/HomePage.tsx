'use client'

import { Pagination } from "../components/paginations";
import { Users } from "../components/user"
import { useState, useEffect } from "react";
import { paginate } from "../components/lodash";
import { SearchUser } from "../components/search";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10
  
  useEffect(() => {
    const fetchUsers = async () => {
      const data = await fetch(`https://dummyjson.com/users/?limit=100`);
      const res = await data.json();
      setUsers(res.users);
    };
    fetchUsers();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  const paginateUsers = paginate(users, currentPage, pageSize);
  
  return (
    <div>
  <SearchUser/>
      <div className='ml-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 '>
      {paginateUsers.map((user) => (
        <Users key={user.id}
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
      ))}
      </div>
      <Pagination 
          items={users.length} 
          pageSize={pageSize} 
          currentPage={currentPage} 
          onPageChange={handlePageChange}
              />
    </div>
  );
}

export default Home