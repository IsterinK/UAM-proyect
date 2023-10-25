import WebHome  from './pages/guest/WebHome';
import Login from './components/Auth/LogIn/LogIn';
import { Users } from './pages/admin/Users/Users';
function App() {
  return (
    <div className="App">
      <Users></Users>
      {/* <WebHome/> */}
    </div>
  );
}

export default App;
