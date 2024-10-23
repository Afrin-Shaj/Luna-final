import { Navigate } from 'react-router-dom';
import authService from '../services/authService';

const PrivateRoute = ({ children }) => {
  const token = authService.getCurrentUser();
  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;