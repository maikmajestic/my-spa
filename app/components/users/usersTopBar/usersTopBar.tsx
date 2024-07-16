import { useState } from "react";
import { useLanguage } from '@/app/context/LanguageContext';
import CreateUserModal from "../../modals/createUserModal";
import styles from "./usersTopBar.module.scss";

interface UsersTopBarProps {
  onSearch: (term: string) => void; 
}

const UsersTopBar: React.FC<UsersTopBarProps> = ({ onSearch }) => {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleOpenModal = () => setIsModalOpen(true);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className={styles.topBarWrapper}>
      <div className={styles.searchContainer}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder={t('search')}
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className={styles.actionContainer}>
        <button className={styles.addUserBtn} onClick={handleOpenModal}>
          {t('createUser')}
        </button>
        <CreateUserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </div>
  );
};

export default UsersTopBar;
