import React, { Fragment } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/global.css';
import Nav from './Components/Nav';
import Footer from './Components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Docs from './pages/Docs';
import Playground from './pages/Playground';

const routes = (
	<Routes>
		<Route path="/" element={<Home />} />
		<Route path="/about" element={<About />} />
		<Route path="/playground" element={<Playground />} />
		<Route path="/documentation" element={<Docs />} />
		<Route path="*" element={<h1>404</h1>} />
	</Routes>
);

const App = () => (
	<Router>
		<Fragment>
			<Nav />
			{routes}
			<Footer />
		</Fragment>
	</Router>
);

createRoot(document.getElementById('root')).render(<App />);
