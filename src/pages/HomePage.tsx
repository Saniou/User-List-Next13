import { Pagination } from "../components/paginations";
import { Users } from "../components/user";
import { useState, useEffect } from "react";
import { SearchBar } from "../components/search";

const Home = ({ limit, skip }) => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await fetch(`https://dummyjson.com/users/?limit=100`);
      const res = await data.json();
      setUsers(res.users);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (limit && skip) {
      const currentPage = Math.floor(skip / limit) + 1;
      setCurrentPage(currentPage);
    }
  }, [limit, skip]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginate = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
  };

  const paginateUsers = paginate(users, currentPage, pageSize);

  return (
    <div>
      <SearchBar />
      <div className='ml-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 '>
        {paginateUsers.map((user) => (
          <Users
            key={user.id}
            id={user.id}
            firstName={user.firstName}
            lastName={user.lastName}
            image={user.image}
            email={user.email}
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
};

export default Home;