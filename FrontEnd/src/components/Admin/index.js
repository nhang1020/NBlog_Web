import { Outlet } from "react-router-dom";
import Header from "./Header";
function Index() {
    return (
        <>
            <div className="header">
                <Header />
            </div>
            <div className="content">
                <Outlet></Outlet>
            </div>
        </>
    );
}

export default Index;
