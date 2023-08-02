import React, { useEffect, Suspense } from 'react'
import LeftContent from './HomeComponents/LeftContent'
import RightContent from './HomeComponents/RightContent'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCode } from '../../../redux/silceReducers/adminReducers'
import './styles/HomePage.scss'
import ModalQuickPost from './HomeComponents/MainComponents/ModalQuickPost';
import { Badge, Card, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import MainContent from './HomeComponents/MainContent'
// const MainContent = React.lazy(() => import('./HomeComponents/MainContent'));
const Home = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const allCodes = useSelector(state => state.admin.allCodes);
  const loading = useSelector(state => state.post.postLoading);
  useEffect(() => {
    // 
    if (!allCodes.length) {
      dispatch(getAllCode());
    }
  }, [dispatch]);

  return (
    <div style={{ display: 'flex' }}>
      <div className='left-content'>
        <LeftContent />
      </div>
      <div className='mid-content mt-3'>

        {/* <Scrollbars style={{ width: '100%', height: '92.5vh' }}> */}
        <Badge.Ribbon style={{ marginRight: '1rem' }} text={t("create-quick-post")} color="cyan" >
          <Card title={t("create-post")} className='m-3 card-custom'>
            <ModalQuickPost />
          </Card>
        </Badge.Ribbon>
        {loading === true ? <Spin style={{ margin: 'auto', width: '100%' }} /> : null}

        <Suspense fallback={<div>Loading...</div>}>
          <MainContent />
        </Suspense>
        {/* </Scrollbars> */}
      </div>
      <div className='right-content'>
        <RightContent />
      </div>
    </div>
  )
}

export default Home