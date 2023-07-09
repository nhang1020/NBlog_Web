import Header from "./header";
import { Outlet } from "react-router-dom";
import AnimationPage from "./componentsCustom/AnimationPage";
function AppClient() {
    return (
        <>

            <Header />
            <AnimationPage>
                <Outlet></Outlet>
            </AnimationPage>
        </>
    );
}

export default AppClient;
