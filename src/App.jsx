import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppointmentProvider } from './context/AppointmentContext';
import { ToastProvider } from './context/ToastContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Toast from './components/common/Toast';

import Home from './pages/Home';
import Auth from './pages/Auth';
import DoctorSearch from './pages/DoctorSearch';
import BookAppointment from './pages/BookAppointment';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientDashboard from './pages/PatientDashboard';
import AIRiskPrediction from './pages/AIRiskPrediction';
import { HealthcareLocator } from './pages/HealthcareLocator';

export function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <AppointmentProvider>
            <ToastProvider>
              <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300 font-sans selection:bg-teal-500 selection:text-white">
                <Navbar />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/doctors" element={<DoctorSearch />} />
                    <Route path="/locator" element={<HealthcareLocator />} />
                    <Route path="/book" element={<BookAppointment />} />
                    <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
                    <Route path="/patient-dashboard" element={<PatientDashboard />} />
                    <Route path="/ai-risk" element={<AIRiskPrediction />} />
                    <Route path="*" element={<Home />} />
                  </Routes>

                </main>
                <Toast />
                <Footer />
              </div>
            </ToastProvider>
          </AppointmentProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
