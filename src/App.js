import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import PropertyList from './pages/PropertyList';
import PropertyDetails from './pages/PropertyDetails';
import AddProperty from './pages/AddProperty';
import NavbarBS from './components/NavbarBS';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
        <div className="d-flex flex-column min-vh-100 bg-light">
        <NavbarBS />
          <main className="flex-grow-1 container py-4">
          <Routes>
            <Route path="/" element={<PropertyList />} />
            <Route path="/propertys/:id" element={<PropertyDetails />} />
            <Route path="/add-property" element={<AddProperty />} />
          </Routes>
          </main>
        <Footer />
        </div>
    </BrowserRouter>
  );
}

export default App;
