
import './App.css';
import 'bootstrap'
import { Suspense, lazy, useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Loading from './components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './redux/userAction';
import LoginForm from './components/loginForm';
import {PrivateComp} from './components/PrivateComp.jsx'

const HomeComp= lazy(()=>import('./components/pages/home'));
const SingleAdvertisment=lazy(()=>import('./components/pages/singleAdvertisment'));
const SearchAdvertisment =lazy(()=>import('./components/pages/SearchAdvertisment'));
const CientLayout= lazy(()=>import('./components/layout/CientLayout'));
const LazyAdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const LazyAdminHomeComp = lazy(() => import('./components/admin/AdminHomeComp'));
const LazyAdminSearchComp = lazy(() => import('./components/admin/AdminSearchComp'));

function App() {
  let [advertisment,setAdvertisment]=useState([])
  let dispatch=useDispatch();

  // let delete adertisment by id
  async function deleteAdvertis(id, alertFunc) {
    try {
      
    
    let data = await fetch(`http://localhost:1500/advertisment/${id}`,{
      method:"DELETE"
    });
    let result= await data.json();
    alertFunc(result.sms,'success')
    fetchAdvertisments()
  }
  catch (error) {
    alertFunc("somthing went wrong",'danger')
  }
}
  async function fetchAdvertisments(){
    try {
        let data = await fetch('http://localhost:1500/advertisment');
        let result= await data.json();
        setAdvertisment(result.data);
      
    } catch (error) {
        console.log("Advertisment not fetched")
    }};
    useEffect(()=>{
      fetchAdvertisments();
dispatch(getUser())
    },[])
  return (
    <Router>
   
    {/* <HeaderComp/> */}
    <Suspense fallback={<Loading/>}>
    <Routes>
      {/* client side routes */}
    <Route path='/' Component={CientLayout}>
    <Route index Component={HomeComp}/>
    <Route path='/advertisment/:id' Component={SingleAdvertisment}/>
    <Route path='/advertisment/search/:country' Component={SearchAdvertisment}/>
    </Route>

    {/* admin routes */}
    <Route Component={PrivateComp}>

<Route
            path="/admin/dashboard"
            element={<LazyAdminLayout Advertismentsfn={fetchAdvertisments} />}
          >
            <Route
              index
              element={
                <LazyAdminHomeComp
                  advertismentList={advertisment}
                  Advertismentsfn={fetchAdvertisments}
                  deleteAdvertis={deleteAdvertis}
                />
              }
            />
            <Route
              path="/admin/dashboard/search/:country"
              element={
                <LazyAdminSearchComp
                  Advertismentsfn={fetchAdvertisments}
                  deleteAdvertis={deleteAdvertis}
                  advertismentList={advertisment}
                />
              }
            />
          </Route>
          </Route>
          <Route path='/login' Component={LoginForm} />
          

    </Routes>
    </Suspense>
    </Router>
   
  );
}

export default App;
