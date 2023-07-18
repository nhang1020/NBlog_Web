import Header from "./header";
import { Outlet } from "react-router-dom";
import AnimationPage from "./componentsCustom/AnimationPage";
import './styles/ClientIndex.scss';
function AppClient() {
    return (
        <>

            <Header />
            <div className="contain">
                <div className="main-content">
                    <AnimationPage>
                        <Outlet></Outlet>
                    </AnimationPage>
                </div>
            </div>

        </>
    );
}

export default AppClient;
