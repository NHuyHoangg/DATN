export function isValidPhoneNumber(phoneNumber) {
  // Define the regular expression pattern for a valid phone number
  const phoneRegex = /^0\d{9,}$/;
  let isValid = true;
  let message = null;

  // Test the phone number against the regular expression
  if (!phoneRegex.test(phoneNumber)) {
    message = "Số điện thoại không hợp lệ";
    isValid = false;
  }
  return { isValid, message };
}
export function isValidEmail(email) {
  // Define the regular expression pattern for a valid email address
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let isValid = true;
  let message = null;
  // Test the email against the regular expression
  if (!emailRegex.test(email)) {
    message = "Email không hợp lệ";
    isValid = false;
  }
  return { isValid, message };
}
export function isValidPassword(password, confirmedPassword) {
  let isValid = true;
  let message = null;
  let isValidConfirm = true;
  let confirmMessage = null;
  if (password.length < 6) {
    isValid = false;
    message = "Mật khẩu phải chứa ít nhất 6 ký tự";
  }
  if (confirmedPassword && password !== confirmedPassword) {
    isValidConfirm = false;
    confirmMessage = "Mật khẩu không trùng khớp";
  }
  return { isValid, message, isValidConfirm, confirmMessage };
}
