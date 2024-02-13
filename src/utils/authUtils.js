import axios from 'axios';
import api from './axiosInterceptors';

export const loginUser = async (email,password) => {
    const url = 'http://localhost:8080/login'; // Adjust the URL to match your backend endpoint
    const userData = {
      username: email,
      password: password
    };

    try {
      const response = await axios.post(url, userData);
      console.log('Login successful:', response.data);
      localStorage.setItem('token', response.data);
      console.log(localStorage.getItem('token'));
      // Handle response here (e.g., redirect to another page, store the user data, etc.)
    } catch (error) {
      console.error('Login failed:', error.response || error.message);
      // Handle error here (e.g., show error message to the user)
    }
  };


  export const testing = async () => {
    try {
      const response = await api.get('http://localhost:8080/testing');
      console.log(response);
      // Handle response here
    } catch (error) {
      console.error(error.response || error.message);
      // Handle error here
    }
  };
  

export const registerUser = async (email,password) => {
    const url = 'http://localhost:8080/register'; // Adjust the URL to match your backend endpoint
    const userData = {
      username: email,
      password: password
    };

    try {
      const response = await axios.post(url, userData);
      console.log('register successful:', response.data);
      // Handle response here (e.g., redirect to another page, store the user data, etc.)
    } catch (error) {
      console.error('register failed:', error.response || error.message);
      // Handle error here (e.g., show error message to the user)
    }
  };
   
export const logOut = async () => {
    localStorage.removeItem('token');
};


