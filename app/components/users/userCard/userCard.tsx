import { useDispatch } from "react-redux"
import { AppDispatch } from "../../../store"
import Link from "next/link"
import { useLanguage } from '@/app/context/LanguageContext';
import { deleteUser } from "../../../store/slices/usersSlice"
import { deleteUserData } from "@/app/lib/data"
import { User } from "@/app/lib/definitions"
import styles from "./userCard.module.scss"
import { useState } from "react"

const UserCard = ({ user }: { user: User }) => {
  const { t } = useLanguage();
  const dispatch = useDispatch<AppDispatch>()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleDelete = async (id: number) => {
    const deleteResponse = await deleteUserData(id)
    if (deleteResponse === "OK") {
      dispatch(deleteUser(id))
    }
  }

  const getInitials = (name: string, lastName: string) => {
    const firstNameInitial = name.charAt(0);
    let lastNameInitial = "";
    if (lastName) {
      const lastNameParts = lastName.split(" ");
      if (lastNameParts.length > 0) {
        lastNameInitial = lastNameParts[0].charAt(0);
      }
    }

    return firstNameInitial + lastNameInitial
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <div className={styles.card} key={user.id}>
      <div className={styles.actionFooter}>
        <div className={styles.actionMenu}>
          <button className={styles.menuButton} onClick={toggleMenu}>
            ...
          </button>
          {menuOpen && (
            <div className={styles.menuContent}>
              <Link href={`/users/${user.id}`} className={styles.menuItem}>
                {t('edit')}
              </Link>
              <a
                className={styles.menuItem}
                onClick={() => handleDelete(user.id)}>
                {t('delete')}
              </a>
            </div>
          )}
        </div>
      </div>
      <div className={styles.avatar}>
        <div className={styles.initials}>
          {getInitials(user.name, user.lastName)}
        </div>
      </div>
      <div className={styles.userInfo}>
        <p>
          {user.name} {user.lastName}
        </p>
        <p className={styles.secondaryText}>{t('age')}: {user.age}</p>
      </div>
      <div className={styles.moreInfo}>
        <p className={styles.secondaryText}>{t('email')}: {user.email}</p>
        <p className={styles.secondaryText}>{t('phone')}: {user.phone}</p>
      </div>
    </div>
  )
}

export default UserCard
