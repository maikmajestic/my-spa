import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { useLanguage } from '@/app/context/LanguageContext';
import { User } from '../../lib/definitions';
import { setUsers } from '../../store/slices/usersSlice';
import styles from './users.module.scss';
import UsersTopBar from './usersTopBar/usersTopBar';
import UserCard from './userCard/userCard';
import Pagination from '../pagination/pagination';

const Users = ({ data }: { data: User[] }) => {
  const { t } = useLanguage();
  const dispatch = useDispatch<AppDispatch>();
  const [filteredUsers, setFilteredUsers] = useState<User[]>(data);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 15;

  useEffect(() => {
    dispatch(setUsers(data));
    setFilteredUsers(data);
  }, [data]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = data.filter(user =>
      user.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className={styles.usersWrapper}>
      <h1 className={styles.wrapperTitle}>{t('users')}</h1>
      <UsersTopBar onSearch={handleSearch} />
      {currentUsers.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className={styles.usersGrid}>
          {currentUsers.map(user => (
            <div className={styles.userCardWrapper} key={user.id}>
              <UserCard user={user} />
            </div>
          ))}
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredUsers.length / usersPerPage)}
        onPageChange={paginate}
      />
    </div>
  );
};

export default Users;
