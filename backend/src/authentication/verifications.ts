export function emailValidation(email: string) {
  if (email.search("@") === -1) {
    return false;
  }
  return true;
}

export function passwordVerification(
  password: string,
  confirmPassword: string
) {
  if (password !== confirmPassword) {
    return false;
  }
  if (password.length < 8) {
    return false;
  }
  if (password.search("[a-z]") === -1) {
    return false;
  }
  if (password.search("[A-Z]") === -1) {
    return false;
  }
  if (password.search("[0-9]") === -1) {
    return false;
  }
  return true;
}

export function usernameVerification(username: string) {
  if (username.length < 5) {
    return false;
  }
  return true;
}

export function birthDateVerification(birthDate: Date) {
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const monthLeft = today.getMonth() - birthDate.getMonth();
  if (
    monthLeft < 0 ||
    (monthLeft === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  if (age < 17) {
    return false;
  }
  return true;
}
