import HeaderLayout from '../components/layout/HeaderLayout';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <HeaderLayout headerClass="sub-platform" headerText="Page Not Found.." />
      <div className="contentsInner">
        <div className="error_frame">
          <div className="errorimg">
            <img src="/asset/images/error_ico.png" alt="" />
          </div>
          <div className="error_copy01">
            <span>죄송합니다.</span>요청하신 페이지를 찾을 수 없습니다.
          </div>
          <div className="error_copy02">
            <span>
              현재 페이지가 존재하지 않거나, 현재 이용할 수 없는 페이지 입니다.
            </span>
            이용에 불편함을 드려 죄송합니다. 조속히 해결하도록 하겠습니다.
          </div>
          <button
            style={{ cursor: 'pointer' }}
            className="button_default maingo"
            onClick={() => navigate('/')}
          >
            메인페이지로 이동
          </button>
        </div>
      </div>
    </>
  );
};

export default NotFound;
