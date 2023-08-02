import Header from "./header";
import { Outlet } from "react-router-dom";
import AnimationPage from "./componentsCustom/AnimationPage";
import './styles/ClientIndex.scss';

import { Scrollbars } from 'react-custom-scrollbars-2';
function AppClient() {
    return (
        <>

            <Header />
            <div className="contain">
                {/* <Scrollbars style={{ height: '100vh', width: '100%' }}> */}
                <div className="main-content">
                    <AnimationPage>
                        <Outlet></Outlet>
                    </AnimationPage>
                </div>

                {/* </Scrollbars> */}
            </div>
        </>
    );
}

export default AppClient;
