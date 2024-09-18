import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
 
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import UserSettings from './pages/UserSettings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import NotFound from './pages/NotFound';
import LoginPage from './pages/Authentication/SignIn'; // Asegúrate de que esta importación esté correcta
import { useAuth } from './context/AuthContext';
import PacientesAdmitidos from './components/Reception/PacientesAdmitidos';

function App() {
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();


  useEffect(() => {
    window.scrollTo(0, 0);

  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading || authLoading) {
    return <Loader />;
  }

   // Si el usuario no está autenticado y no está en las rutas públicas (login o signup), redirigir al login
   const isAuthRoute = pathname === '/auth/signup' || pathname === '/auth/signin';
   
   if(pathname==='/auth/signup'){ return <SignUp />}
   if (!user && !isAuthRoute) {
     return <LoginPage />;
   }
  return (
    <DefaultLayout>

<Routes>
        {/* Rutas de autenticación (públicas) */}
        

        {/* Rutas protegidas */}
        
        <Route
          index
          element={
            <>
              <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ECommerce />
            </>
          }
        />

        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Calendar />
            </>
          }
        />
         <Route
          path="/recepcion"
          element={
            <>
              <PageTitle title="Recepción | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <PacientesAdmitidos />
            </>
          }
        />

        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </>
          }
        />

        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormElements />
            </>
          }
        />

        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormLayout />
            </>
          }
        />

        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Tables />
            </>
          }
        />

        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <UserSettings />
            </>
          }
        />

        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Chart />
            </>
          }
        />

        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
            </>
          }
        />

        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
            </>
          }
        />

        

        <Route path="*" element={<NotFound />} />
      </Routes>
    </DefaultLayout>
  );
}

export default App;

 
