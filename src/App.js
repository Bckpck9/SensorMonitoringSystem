import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Form from './pages/Form';

import IncidentsHome from './pages/IncidentsHome';
import IncidentDetail from './pages/IncidentDetail';
import IncidentForm from './pages/IncidentForm';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/add" element={<Form mode="create" />} />
        <Route path="/edit/:id" element={<Form mode="edit" />} />

        <Route path="/incidents" element={<IncidentsHome />} />
        <Route path="/incidents/add" element={<IncidentForm mode="create" />} />
        <Route path="/incidents/edit/:id" element={<IncidentForm mode="edit" />} />
        <Route path="/incidents/:id" element={<IncidentDetail />} />
      </Routes>
    </Router>
  );
}
