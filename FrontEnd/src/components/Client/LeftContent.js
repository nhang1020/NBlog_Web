import { Calendar, theme } from 'antd';
import '../styles/temperature.css';
const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
};
const LeftContent = () => {
    const { token } = theme.useToken();
    const wrapperStyle = {
        width: 300,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
    };
    return (
        <>
            <main className="main">

                <div className="left">
                    <div className="date">
                        Thursday, 8 December 2022
                    </div>
                    <div className="city">
                        An Giang
                    </div>
                    <div className="tempreture">
                        <img src="https://cdn-icons-png.flaticon.com/512/1779/1779940.png" alt="icon" className="left-img" />
                        31&deg;
                    </div>
                </div>

                <div className="right">
                    <div className="city-img">
                        <img src="https://cdn3.ivivu.com/2022/06/du-lich-an-giang-b.jpg" alt="tajmahal" className="right-img" />
                    </div>
                </div>

            </main>
            <div style={wrapperStyle} className='calendar'>
                <Calendar className='calendar-component' fullscreen={false} onPanelChange={onPanelChange} />
            </div>
        </>
    );

};
export default LeftContent;