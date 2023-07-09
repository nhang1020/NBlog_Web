import { Outlet } from "react-router-dom";
import Header from "./Header";
import AnimationPage from "../componentsCustom/AnimationPage";
function Index() {
    return (
        <>
            <div className="header">
                <Header />
            </div>
            <AnimationPage>
                <div className="content">
                    <Outlet></Outlet>
                </div>
            </AnimationPage>
        </>
    );
}

export default Index;
