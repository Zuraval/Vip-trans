import { Routes, Route, Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ServicePage from './pages/ServicePage'
import TransportPage from './pages/TransportPage'
import ContactsPage from './pages/ContactsPage'

function Layout() {
  return (
    <div className="wrapper">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path="/transportation" element={<TransportPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
      </Route>
    </Routes>
  )
}

export default App
