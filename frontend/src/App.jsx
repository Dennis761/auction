import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChooseOptionForm from './Components/Forms/ChoseOptionForm.jsx'
import AttendAuction from './Components/RoleOptions/Attend/AttendAuction.jsx';
import SummitAuction from './Components/RoleOptions/Summit/SummitAuction.jsx'
import AttendAuctionProduct from './Components/MainScreen/MemberScreen/AttendAuctionProduct.jsx'
import SummitAuctionProduct from './Components/MainScreen/SummiterScreen/SummitAuction.jsx';
import Login from './Components/Auth/Login.jsx'
import './App.css'

function App() {

  return (
    <>
      <Router>
        <Routes>
        <Route path='/login' element={<Login/>}/>
          <Route path='/auction' element={<ChooseOptionForm/>}/>
          <Route path='/attend-auction-product/:id' element={<AttendAuctionProduct/>}/>
          <Route path='/summit-auction-product/:id' element={<SummitAuctionProduct/>}/>
          {/* <Route path='/start-auction' element={}/> */}
          <Route path='/attend-an-auction' element={<AttendAuction/>}/>
          <Route path='/summit-an-auction' element={<SummitAuction/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
