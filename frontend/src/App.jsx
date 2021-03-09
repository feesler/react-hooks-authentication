import Header from './components/Header/Header.jsx';
import Content from './components/Content/Content.jsx';
import AuthProvider from './providers/AuthProvider.js';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Header />
      <Content />
    </AuthProvider>
  );
}

export default App;
