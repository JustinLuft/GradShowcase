import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import IndexPage from './pages/Index';
import LoginPage from './pages/signin';
import CreateProfilePage from './pages/CreateProfilePage';
import BrowseGraduatesPage from './pages/BrowseGraduatesPage';
import NotFound from './pages/NotFound';
import RegistrationPage from './pages/RegistrationPage'; // adjust this path if needed


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="signin" element={<LoginPage />} />
          <Route path="create-profile" element={<CreateProfilePage />} />
          <Route path="graduates" element={<BrowseGraduatesPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="register" element={<RegistrationPage />} />

        </Route>
      </Routes>
    </Router>
  );
};

export default App;
