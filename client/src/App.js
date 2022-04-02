import logo from './logo.svg';
import './App.css';
import Layout from './layout/Layout';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Layout>
      <LoginPage></LoginPage>
    </Layout>
  );
}

export default App;
