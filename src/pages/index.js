import Home from "../components/Home"
import { Route ,Routes} from "react-router-dom"
import Navbar from "../components/Navbar"
import View from "../components/View"

const Index=()=>{
    return(
        <>
            <Navbar/>
            <Routes>
                {/* <Route element={<PublicRoutes />}> */}
                <Route path="/" element={<Home />} />
                <Route path="/view" element={<View/>}/>
            </Routes>
        </>
    )
}

export default Index