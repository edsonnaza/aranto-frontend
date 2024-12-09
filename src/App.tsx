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
import LoginPage from './pages/Authentication/SignIn';
import { useAuth } from './context/AuthContext';
import PacientesAdmitidos from './components/Reception/PacientesAdmitidos';
import SeguroMedicoTable from './components/Catastros/SeguroMedico/SeguroMedicoTable';
import SeguroMedico from './components/Catastros/SeguroMedico/SeguroMedico';
import PacientesForm from './components/Catastros/Pacientes/PacientesForm';
import PacientesTable from './components/Catastros/Pacientes/PacientesTable';
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

  // Rutas de autenticación (signup y signin) se renderizan sin layout
  const isAuthRoute = pathname === '/auth/signup' || pathname === '/auth/signin';

  if (!user && !isAuthRoute) {
    return <LoginPage />;
  }

  return (
    <>
      {isAuthRoute ? (
        // Rutas de autenticación sin DefaultLayout
        <Routes>
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/signin" element={<LoginPage />} />
        </Routes>
      ) : (
        // Rutas con DefaultLayout
        <DefaultLayout>
          <Routes>
          <Route path="/" element={<ECommerce />} />
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
              path="/seguromedico"
              element={
                <>
                  <PageTitle title="Seguro Medico" />
                  <SeguroMedicoTable />
                </>
              }
            />
            <Route
              path="/recepcion"
              element={
                <>
                  <PageTitle title="Recepción" />
                  <PacientesAdmitidos />
                </>
              }
            />
            <Route path="/seguromedico/nuevo" element={<SeguroMedico />} />
            <Route path="/seguromedico/editar/:id" element={<SeguroMedico />} />
            <Route path="/seguromedico/:id/delete-logico" element={<SeguroMedico />} />
            <Route path="/pacientes/" element={<PacientesTable />} />
            <Route path="/pacientes/nuevo" element={<PacientesForm />} />
            <Route
              path="/pacientes"
              element={
                <>
                  <PageTitle title="Pacientes" />
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
                  <PageTitle title="Form Elements | " />
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
      )}
    </>
  );
}

export default App;
