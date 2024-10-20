import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import AppRoutes from './Routes';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
