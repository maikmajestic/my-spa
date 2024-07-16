import React, { useState } from "react";
import { useLanguage } from '@/app/context/LanguageContext';
import { User } from "@/app/lib/definitions";
import {
  validateName,
  validateAge,
  validatePhone,
  validateEmail,
} from "../utils/validations";

interface FormProps {
  user: User;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const UserForm: React.FC<FormProps> = ({ user, onChange }) => {
  const { t } = useLanguage();
  const [nameError, setNameError] = useState<string | null>(null);
  const [lastNameError, setLastNameError] = useState<string | null>(null);
  const [ageError, setAgeError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onChange(e);
    if (value && !validateName(value)) {
      setNameError(t('nameError'));
    } else {
      setNameError(null);
    }
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onChange(e);
    if (value && !validateName(value)) {
      setLastNameError(t('lastNameError'));
    } else {
      setLastNameError(null);
    }
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onChange(e);
    const age = parseInt(value, 10);
    if (value && (!validateAge(age) || isNaN(age))) {
      setAgeError(t('ageError'));
    } else {
      setAgeError(null);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onChange(e);
    if (value && !validatePhone(value)) {
      setPhoneError(t('phoneError'));
    } else {
      setPhoneError(null);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onChange(e);
    if (value && !validateEmail(value)) {
      setEmailError(t('emailError'));
    } else {
      setEmailError(null);
    }
  };

  return (
    <>
      <label className="label" htmlFor="name">
        {t('name')}:
      </label>
      <input
        className="inputForm"
        type="text"
        id="name"
        name="name"
        value={user.name}
        onChange={handleNameChange}
        maxLength={25}
        pattern="[A-Za-z\s]{1,25}"
        title={t('nameError')}
        required
      />
      {nameError && <p className="error">{nameError}</p>}

      <label className="label" htmlFor="lastName">
        {t('lastName')}:
      </label>
      <input
        className="inputForm"
        type="text"
        id="lastName"
        name="lastName"
        value={user.lastName}
        onChange={handleLastNameChange}
        maxLength={25}
        pattern="[A-Za-z\s]{1,25}"
        title={t('lastNameError')}
        required
      />
      {lastNameError && <p className="error">{lastNameError}</p>}

      <label className="label" htmlFor="age">
        {t('age')}:
      </label>
      <input
        className="inputForm"
        type="number"
        id="age"
        name="age"
        value={user.age}
        onChange={handleAgeChange}
        min={0}
        max={120}
        required
      />
      {ageError && <p className="error">{ageError}</p>}

      <label className="label" htmlFor="phone">
        {t('phone')}:
      </label>
      <input
        className="inputForm"
        type="tel"
        id="phone"
        name="phone"
        value={user.phone}
        onChange={handlePhoneChange}
        maxLength={12}
        pattern="\d{1,12}"
        title={t('phoneError')}
        required
      />
      {phoneError && <p className="error">{phoneError}</p>}

      <label className="label" htmlFor="email">
        {t('email')}:
      </label>
      <input
        className="inputForm"
        type="email"
        id="email"
        name="email"
        value={user.email}
        onChange={handleEmailChange}
        pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
        title={t('emailError')}
        required
      />
      {emailError && <p className="error">{emailError}</p>}
    </>
  );
};

export default UserForm;
