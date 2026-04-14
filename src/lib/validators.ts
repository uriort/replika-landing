const PERSONAL_EMAIL_DOMAINS = [
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "yahoo.co.uk",
  "yahoo.fr",
  "yahoo.de",
  "hotmail.com",
  "hotmail.co.uk",
  "outlook.com",
  "outlook.fr",
  "live.com",
  "live.co.uk",
  "msn.com",
  "aol.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "mail.com",
  "protonmail.com",
  "proton.me",
  "zoho.com",
  "yandex.com",
  "yandex.ru",
  "gmx.com",
  "gmx.de",
  "fastmail.com",
  "tutanota.com",
  "tuta.io",
  "hey.com",
  "pm.me",
  "inbox.com",
  "mail.ru",
  "163.com",
  "qq.com",
  "naver.com",
  "daum.net",
  "hanmail.net",
  "rediffmail.com",
  "web.de",
  "t-online.de",
  "laposte.net",
  "free.fr",
  "orange.fr",
  "comcast.net",
  "att.net",
  "verizon.net",
  "sbcglobal.net",
  "cox.net",
  "charter.net",
];

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isWorkEmail(email: string): boolean {
  if (!isValidEmail(email)) return false;
  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain) return false;
  return !PERSONAL_EMAIL_DOMAINS.includes(domain);
}

export function getEmailError(email: string): string | null {
  if (!email) return "Email is required";
  if (!isValidEmail(email)) return "Please enter a valid email address";
  if (!isWorkEmail(email)) return "Please use your work email address";
  return null;
}
