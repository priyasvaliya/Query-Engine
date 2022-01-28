import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import { Account } from "./components/Account";

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import CodeScreen from './screens/CodeScreen';
import SecurityQuestion from './screens/SecurityQuestion';
import CaesarCipher from './screens/CaesarCipher';



function App() {
  return (
    <Account>
    <Router>
      <Header/>
      <main className="py-3">
        <Container>
        <Route path="/" component={HomeScreen}  exact/>
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen}  />
        <Route path="/codeverify" component={CodeScreen}  />
        <Route path="/loginsecurity" component={SecurityQuestion}  />
        <Route path="/ciphersecurity" component={CaesarCipher}  />
        </Container>
      </main>
      <Footer/>
    </Router>
    </Account>
  );
}

export default App;
