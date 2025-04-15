import React from 'react';
import { Routes, Route } from 'react-router-dom'; // No Router import needed
import Doctors from '../page/DoctorPage/Doctors';
import Form from '../page/Form/Form';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Doctors />} />
      <Route path="/book" element={<Form />} />
    </Routes>
  );
}

export default App;