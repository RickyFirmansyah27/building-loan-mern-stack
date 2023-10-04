import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Users from "./pages/Users";
import RequestBooking from "./pages/RequestBooking";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import Ekskuls from "./pages/Ekskuls";
import AddEkskul from "./pages/AddEkskul";
import EditEkskul from "./pages/EditEkskul";
import AddGedung from "./pages/AddGedung";
import EditGedung from './pages/EditGedung';
import ViewGedung from './pages/ViewGedung';
import Gedungs from './pages/Gedungs';
import Bookings from './pages/Bookings';
import AddBooking from "./pages/AddBooking";
import EditBooking from "./pages/EditBooking";
import DaftarBooking from "./pages/daftarBooking";
import Ekstrakurikulers from './pages/Ekstrakurikulers';
import AddEkstrakurikuler from "./pages/AddEkstrakurikuler";
import EditEkstrakurikuler from "./pages/EditEkstrakurikuler";
import Report from "./pages/Report";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/request-booking" element={<RequestBooking />} />
          <Route path="/ekskuls" element={<Ekskuls />} />
          <Route path="/ekskuls/add" element={<AddEkskul />} />
          <Route path="/ekskuls/edit/:id" element={<EditEkskul />} />
          <Route path="/gedungs/edit/:id" element={<EditGedung />} />
          <Route path="/gedungs/view/:id" element={<ViewGedung />} />
          <Route path="/gedungs/add" element={<AddGedung />} />
          <Route path="/gedungs" element={<Gedungs />} />
          <Route path="/dbookings" element={<DaftarBooking />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/bookings/add" element={<AddBooking />} />
          <Route path="/bookings/edit/:id" element={<EditBooking />} />
          <Route path="/ekstrakurikulers" element={<Ekstrakurikulers />} />
          <Route path="/ekstrakurikulers/add" element={<AddEkstrakurikuler />} />
          <Route path="/ekstrakurikulers/edit/:id" element={<EditEkstrakurikuler />} />
          <Route path="/reports/rekbookings" element={<Report />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
