import './App.css';
import Layout from './layout/Layout';
import LoginPage from './pages/LoginPage';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import SignIn from './components/pages/loginform/SignIn';
import Home from './pages/Home';
import SignUp from './components/pages/loginform/SignUp'
import Web3ContextProvider from './context/web3Context';
import PrivateRoute from './components/router/PrivateRoute';

function App() {
  return (
    <Web3ContextProvider>
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path='/home' element={<PrivateRoute><Home></Home></PrivateRoute>}></Route>
            <Route path="/login/*" element={<LoginPage></LoginPage>}>
              <Route path='login' element={<LoginPage />} />
              <Route path='register' element={<LoginPage />} />
            </Route>
            <Route path='*' element={<PrivateRoute><Home></Home></PrivateRoute>}></Route>
          </Routes>
          <Outlet></Outlet>

        </BrowserRouter>
      </Layout>
    </Web3ContextProvider>
  );
}

export default App;
