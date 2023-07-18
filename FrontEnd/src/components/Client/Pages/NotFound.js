import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
const App = () => (
    <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary"><Link className='nav-link' to='/'>home page</Link></Button>}
    />
);
export default App;