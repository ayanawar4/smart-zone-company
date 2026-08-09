import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Fund from './pages/Fund';
import Expenses from './pages/Expenses';
import Salaries from './pages/Salaries';
import Invoices from './pages/Invoices';
import Employees from './pages/Employees';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-shell">
      <button className="sidebar-toggle" onClick={() => setSidebarOpen(true)}>☰</button>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/fund" element={<Fund />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/salaries" element={<Salaries />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/employees" element={<Employees />} />
        </Routes>
      </main>
    </div>
  );
}
