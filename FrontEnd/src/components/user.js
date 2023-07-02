import { useEffect, useMemo, useState } from 'react';
import axios from '../utils/axios';
import { Button } from 'antd';


const User = () => {
    const [allCode, setAllCode] = useState({});

    const handleGetData = async () => {
        let res = await axios.get(`/api/get-allcode?type=${'gender'}`);
        setAllCode(res.data);
    };

    return (
        <div className="container">
            <h1>All Code</h1>
            <Button onClick={handleGetData}>Gender</Button>
            {allCode && allCode.length > 0 && allCode.map(item => {
                return <p>{item.valueEn}</p>
            })}
        </div>
    )
}

export default User