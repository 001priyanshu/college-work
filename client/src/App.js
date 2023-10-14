import { Route, Routes } from 'react-router-dom';
import SignIn from './pages/Landing/Signin';
import Signup from './pages/Landing/Signup';
import AllRecipe from './pages/Recipe/AllRecipe';


function App() {
  return (


    <Routes>
      <Route path="/" exact element={<SignIn />} />
      <Route path="/register" exact element={<Signup />} />
      <Route path="/recipe" exact element={<AllRecipe/>}/>

    </Routes>

  );
}

export default App;
