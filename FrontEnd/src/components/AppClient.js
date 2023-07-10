import Header from "./header";
import { Outlet } from "react-router-dom";
import AnimationPage from "./componentsCustom/AnimationPage";
import './styles/ClientIndex.scss';
import RightContent from './Client/RightContent';
import LeftContent from './Client/LeftContent';
function AppClient() {
    return (
        <>
            <Header />
            <div className="contain">
                <div className="left-content">
                    <LeftContent />
                </div>
                <div className="main-content">
                    <AnimationPage>
                        <Outlet></Outlet>
                    </AnimationPage>
                </div>
                <div className="right-content">
                    <RightContent />
                </div>
            </div>
        </>
    );
}

export default AppClient;
