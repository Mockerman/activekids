import { jwtDecode } from 'jwt-decode';

export const getUserIdFromToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const decoded = jwtDecode(token);
    return decoded.userId; // Benutzer-ID aus dem Token extrahieren
  }
  return null; // Oder handle den Fall, wenn kein Token vorhanden ist
};
