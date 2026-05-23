import { BrowserRouter, Route, Routes } from "react-router-dom";
import Beranda from "./pages/Beranda";
import Competition from "./pages/Competition";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Seminar from "./pages/Seminar";
import Talkshow from "./pages/Talkshow";
import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import Workshop from "./pages/Workshop";
import CreateCategory from "./pages/dashboard/categories/CreateCategory";
import CreateEvent from "./pages/dashboard/events/CreateEvent";
import CreateSpeakers from "./pages/dashboard/speakers/CreateSpeakers";
import DashboardIndex from "./pages/dashboard/DashboardIndex";
import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardLayout from "./layout/DashboardLayout";
import Listcategory from "./pages/dashboard/categories/ListCategory";
import Listevent from "./pages/dashboard/events/ListEvent";
import Listspeaker from "./pages/dashboard/speakers/ListSpeaker";
import EditCategory from "./pages/dashboard/categories/EditCategory";
import Editspeaker from "./pages/dashboard/speakers/EditSpeaker";
import Editevent from "./pages/dashboard/events/EditEvent";
import Saya from "./pages/Saya";


function App() {
  return <BrowserRouter>
    <Routes>
      {/* landing page */}
      <Route path="/" element={<MainLayout />} >
        <Route path="/" element={<Beranda />} />
        <Route path="/competition" element={<Competition />} />
        <Route path="/seminar" element={<Seminar />} />
        <Route path="/talkshow" element={<Talkshow />} />
        <Route path="/workshop" element={<Workshop />} />


      </Route>

      {/* auth */}
      <Route path="/" element={<AuthLayout />} >
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Dashboard */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardIndex />} />

          <Route path="/dashboard/category/create" element={<CreateCategory />} />
          <Route path="/dashboard/category/listcategory" element={<Listcategory />} />
          <Route path="/dashboard/category/editcategory/:id" element={<EditCategory />} />

          <Route path="/dashboard/events/create" element={<CreateEvent />} />
          <Route path="/dashboard/events/listevent" element={<Listevent />} />
          <Route path="/dashboard/events/editevent/:id" element={<Editevent />} />

          <Route path="/dashboard/speaker/create" element={<CreateSpeakers />} />
          <Route path="/dashboard/speaker/Listspeaker" element={<Listspeaker />} />
          <Route path="/dashboard/speaker/editspeaker/:id" element={<Editspeaker />} />

        </Route>
      </Route>

      {/* Tidak pakai layout */}
      <Route path="/saya" element={<Saya />} />

    </Routes>



  </BrowserRouter>;
}

export default App;