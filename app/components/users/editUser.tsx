"use client";
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/app/context/LanguageContext';
import { User } from '../../lib/definitions';
import { editUser } from '@/app/store/slices/usersSlice';
import { editUserData } from '@/app/lib/data';
import styles from './users.module.scss';
import UserForm from '../forms/userForm';
import {
  validateName,
  validateAge,
  validatePhone,
  validateEmail,
} from '../../components/utils/validations';

const EditUser = ({ user }: { user: User }) => {
  const { t } = useLanguage();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [userData, setUserData] = useState<User>(user);
  const [formValid, setFormValid] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prevUser) => ({
      ...prevUser,
      [name]: name === 'age' ? parseFloat(value) : value,
    }));
  };

  const validateForm = () => {
    const { name, lastName, age, phone, email } = userData;
    const isNameValid = validateName(name);
    const isLastNameValid = validateName(lastName);
    const isAgeValid = validateAge(age);
    const isPhoneValid = validatePhone(phone);
    const isEmailValid = validateEmail(email);
    return (
      isNameValid &&
      isLastNameValid &&
      isAgeValid &&
      isPhoneValid &&
      isEmailValid
    );
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const editUserResponse = await editUserData(userData);

    if (editUserResponse === "OK") {
      dispatch(editUser(userData));
      setUserData(userData);
      router.push('/')
    }
  };

  useEffect(() => {
    setUserData(user);
  }, [user]);

  useEffect(() => {
    setFormValid(validateForm());
  }, [userData]);

  if (!user) {
    return <div>{t('userNotFound')}</div>;
  }

  return (
    <div className={styles.usersWrapper}>
      <h1>{t('editUser')}</h1>
      <form className={styles.formModal} onSubmit={handleSave}>
        <UserForm user={userData} onChange={handleChange} />
        <button
          className={styles.btnSubmit}
          type="submit"
          disabled={
            !formValid ||
            !userData.name ||
            !userData.phone ||
            !userData.email ||
            userData.age === 0
          }
        >
          {t('save')}
        </button>
      </form>
    </div>
  );
};

export default EditUser;
