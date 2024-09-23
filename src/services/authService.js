import API from './api';

export const register = async (userData) => {
  try {
    const response = await API.post('/user/register', userData);
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

export const login = async (userData) => {
  try {
    const response = await API.post('/user/login', userData);
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const verifyInviteCode = async (code) => {
  try {
    const response = await API.post('/inviteCode/verify', { code });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Invite code verification failed');
  }
};

