import WebHome  from './pages/guest/WebHome';
import Login from './components/Auth/LogIn/LogIn';
import Users from './pages/admin/users/Users';
import SignUp from './components/Auth/SignUp/SignUp';

function App() {
  return (
    <div className="App">
      <SignUp></SignUp>
      {/* <Users></Users> */}
      {/* <Login></Login> */}
      {/* <WebHome/> */}
    </div>
  );
}

export default App;
