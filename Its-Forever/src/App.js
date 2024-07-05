import React, {useEffect} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useParams
} from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

import LandingPage from './Components/LandingPage/LandingPage/landingPage';
import Albums from './Components/Albums/Albums/Albums';
import HostGuestPage from './Components/Login/HostGuestPage'
import OTPPage from './Components/Login/OTPPage';
import { AuthProvider } from './Authentication/AuthContext';
import ProtectedRoute from './Authentication/ProtectedRoute';
import { GlobalProvider } from './Context/GlobalContext';
import PhysicalAlbum from './Components/PhysicalAlbum/PhysicalAlbum';

const DynamicNavigate = () =>  {
  const {id} = useParams();
  sessionStorage.setItem('eventID', id);
  return <Navigate to={`/${id}/login`} replace />;
};


function App() {
  return (
    <GlobalProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/:id" element={<DynamicNavigate />}/>
            <Route path="/:id/login" element={<HostGuestPage />}/>
            <Route element={<ProtectedRoute />}>
              <Route path="/:id/otp" element={<OTPPage />} />
              <Route path="/:id/landing" element={<LandingPage />} />
              <Route path="/:id/albums/:albumId" element={<Albums />} />
              <Route path="/:id/physical-albums" element={<PhysicalAlbum />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </GlobalProvider>
  );
}

export default App;
