import React from 'react'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Home from './pages/Home'
import MLModelInfo from './pages/MLModelInfo'
import NNModelInfo from './pages/NNModelInfo'
import TestMLModel from './pages/TestMLModel'
import TestNNModel from './pages/TestNNModel'

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <span className="nav-title">ML Project</span>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/ml-info">ML Model Info</NavLink>
        <NavLink to="/nn-info">NN Model Info</NavLink>
        <NavLink to="/test-ml">Test ML Model</NavLink>
        <NavLink to="/test-nn">Test NN Model</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ml-info" element={<MLModelInfo />} />
        <Route path="/nn-info" element={<NNModelInfo />} />
        <Route path="/test-ml" element={<TestMLModel />} />
        <Route path="/test-nn" element={<TestNNModel />} />
      </Routes>
    </BrowserRouter>
  )
}