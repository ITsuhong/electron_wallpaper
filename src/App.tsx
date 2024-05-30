import NavTop from "./components/NavTop";
import {Route, Routes, Outlet, Navigate} from "react-router-dom"
import DynamicWallpaper from "@/page/dynamicWallpaper";

function App() {


    return (
        <Routes>
            <Route path='/' element={<Home/>}>
                <Route index element={<Navigate to="/dynamic"/>}/>
                <Route path="/dynamic" element={<DynamicWallpaper/>}></Route>
            </Route>
        </Routes>
    )
}

const Home = () => {
    return <>
        <NavTop/>
        <Outlet/>
    </>
}
export default App
