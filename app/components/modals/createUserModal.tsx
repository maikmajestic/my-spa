import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { useLanguage } from '@/app/context/LanguageContext';
import { ModalProps, User } from "@/app/lib/definitions";
import { addUser } from "@/app/store/slices/usersSlice";
import { createUser } from "@/app/lib/data";
import styles from "./modal.module.scss";
import UserForm from "../forms/userForm";
import {
  validateName,
  validateAge,
  validatePhone,
  validateEmail,
} from "../../components/utils/validations";

const CreateUserModal: React.FC<ModalProps & { initialUser?: User }> = ({
  isOpen,
  onClose,
  initialUser,
}) => {
  const { t } = useLanguage();
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users.list);
  
  const getNewUserId = () => {
    const maxId = users.reduce((max, user) => (user.id > max ? user.id : max), 0);
    return maxId + 1;
  };

  const newUserTemplate: User = {
    id: getNewUserId(),
    name: "",
    lastName: "",
    age: 0,
    phone: "",
    email: "",
  };

  const [user, setUser] = useState<User>(initialUser || newUserTemplate);

  const [formValid, setFormValid] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: name === "age" ? parseFloat(value) : value,
    }));
  };

  const validateForm = () => {
    const { name, lastName, age, phone, email } = user;
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = { ...user, id: getNewUserId() }; // Actualiza el ID aquí
    const createUserResponse = await createUser(userData);

    if (createUserResponse === "OK") {
      setUser(newUserTemplate); // Resetear el usuario después de crear
      dispatch(addUser(userData));
      onClose();
    }
  };

  useEffect(() => {
    setFormValid(validateForm());
  }, [user]);

  useEffect(() => {
    if (!initialUser) {
      setUser(newUserTemplate);
    }
  }, [users.length]);

  return (
    <div className={`${styles.modal} ${isOpen ? styles.open : ""}`}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <h2 className={styles.modalTitle}>{t('createUser')}</h2>
        <form className={styles.formModal} onSubmit={handleSubmit}>
          <UserForm user={user} onChange={handleChange} />
          <button
            className={styles.btnSubmit}
            type="submit"
            disabled={!formValid}
          >
            {t('submit')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;
