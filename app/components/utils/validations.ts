export const validateName = (name: string): boolean => {
  return /^[a-zA-Z\s]{1,25}$/.test(name);
};

export const validateAge = (age: number): boolean => {
  return !isNaN(age) && age >= 0 && age <= 120;
};

export const validatePhone = (phone: string): boolean => {
  return /^\d{1,12}$/.test(phone);
};

export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
