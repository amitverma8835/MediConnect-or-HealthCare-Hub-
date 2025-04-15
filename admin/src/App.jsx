import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import AddDoctorForm from './pages/AddDoctorForm/AddDoctorForm';
import UpdateDoctor from './pages/UpdateDoctor/UpdateDoctor';
import DeleteDoctor from './pages/DeleteDoctor/DeleteDoctor'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload-doctors" element={<AddDoctorForm />} />
        <Route path="/update-doctors" element={< UpdateDoctor/>} />
        <Route path="/delete-doctor" element={< DeleteDoctor/>} />

      </Routes>
    </Router>
  );
}

export default App;