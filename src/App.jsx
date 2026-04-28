import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster, toast } from 'react-hot-toast';
import { useEffect } from 'react';

// Pages
import Login from './pages/Login.jsx';
import DashboardOverview from './pages/DashboardOverview.jsx';
import Orders from './pages/Orders.jsx';
import Services from './pages/Services.jsx';
import StaffManagement from './pages/StaffManagement.jsx';
import StaffDashboard from './pages/StaffDashboard.jsx';
import InvoiceView from './pages/InvoiceView.jsx';
import TrackOrder from './pages/TrackOrder.jsx';
// import MuftiLandingPage from './pages/MuftiLandingPage';
// Components & Middleware
import ProtectedRoute from './components/protectedRoute.jsx';
import AdminLayout from './components/AdminLayout.jsx';
import MuftiLandingPage from './muftiLandingpage/MuftiLandingPage.jsx';

function App() {

  useEffect(() => {
    const handleOnline = () => {
      toast.success("Back Online", { 
        id: 'network-status', // Prevents stacking
        icon: '🌐' 
      });
    };

    const handleOffline = () => {
      toast.error("You are currently offline", { 
        id: 'network-status', // This replaces the "Back Online" toast if it exists
        duration: Infinity,   // Keeps it visible until they are back online
        icon: '⚠️'
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <AuthProvider>

     <Toaster 
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontSize: '12px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            borderRadius: '16px',
            background: '#ffffff',
            color: '#0f172a', // brand-navy
            border: '1px solid #f1f5f9',
          },
        }}
      />


      <Router>
        <Routes>
          {/* ================================================
              PUBLIC ROUTES
              Accessible by everyone (Customers & Guests)
          ================================================ */}
          <Route path="/" element={<MuftiLandingPage />} />
          <Route path="/track" element={<TrackOrder />} />
          <Route path="/login" element={<Login />} />
          <Route path="/invoice/:orderId" element={<InvoiceView />} />

          {/* ================================================
              ADMIN ROUTES (Nested under AdminLayout)
              Requires: Authentication + Admin Role
          ================================================ */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminLayout />
              </ProtectedRoute>
            } 
          >
            {/* These render within the <Outlet /> of AdminLayout */}
            <Route index element={<DashboardOverview />} />
            <Route path="orders" element={<Orders />} />
            <Route path="services" element={<Services />} />
            <Route path="staff" element={<StaffManagement />} />
          </Route>

          {/* ================================================
              STAFF ROUTES
              Requires: Authentication + Staff Role
          ================================================ */}
          <Route 
            path="/staff" 
            element={
              <ProtectedRoute staffOnly={true}>
                <StaffDashboard />
              </ProtectedRoute>
            } 
          />

          {/* ================================================
              FALLBACK ROUTE
              Redirects any undefined paths to the Home/Track page
          ================================================ */}
          <Route path="*" element={<Navigate to="/" replace />} />
          
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;