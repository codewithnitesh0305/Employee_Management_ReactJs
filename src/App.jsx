import { useState } from 'react'
import Header from './Components/Headers/Header'
import AllEmployees from './Components/Employee/AllEmployees'
import AddEmployee from './Components/Employee/AddEmployee'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Header/>
      <Routes>
          <Route path='/'element={<AllEmployees/>}/>
          <Route path='/addEmployee'element={<AddEmployee/>}/>
          
          {/* For http://localhost:80801/editEmployee/:id */}
          <Route path='/editEmployee/:id' element={<AddEmployee/>}></Route>
      </Routes>
    </div>
  )
}

export default App
