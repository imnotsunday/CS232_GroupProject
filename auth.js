
export function getToken() {
  return localStorage.getItem('token');
}

export function decodeToken(token) {
  try {
    const payload = token.split('.')[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
  } catch (err) {
    return null;
  }
}

export function getUserRole() {
  const token = getToken();
  if (!token) return null;
  const decoded = decodeToken(token);
  return decoded?.role || null;
}

export function getUserId() {
  const token = getToken();
  if (!token) return null;
  const decoded = decodeToken(token);
  return decoded?.userId || null;
}


export function requireRole(requiredRole) {
  const role = getUserRole();
  if (!role) {
    window.location.href = "login.html"; 
  } else if (role !== requiredRole) {
    window.location.href = "unauthorized.html"; 
  }
}


export function logout() {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
}

export function getUser() {
  const token = getToken();
  if (!token) return null;
  return decodeToken(token);
}