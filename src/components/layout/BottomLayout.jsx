const BottomLayout = () => {
  return (
    <footer id="footer">
      <input type="hidden" id="data-flag" />
      <div className="user-guide-md">
        <div className="md-rect">
          <a href="#!" onClick={e => e.preventDefault()} className="btn-close">
            닫기
          </a>
          <h3 className="md-tit">이용약관</h3>
          <div className="guide-wr">
            <div id="layout-policy-area"></div>
          </div>
        </div>
      </div>

      <div className="ft-banner">
        <ul>
          <li>
            <a href="https://www.katri.re.kr" target="_blank" rel="noreferrer">
              <img src="/assets/images/ft-banner01.png" alt="KATRI" />
            </a>
          </li>
          <li>
            <a href="https://www.ktl.re.kr" target="_blank" rel="noreferrer">
              <img src="/assets/images/ft-banner04.png" alt="KTL" />
            </a>
          </li>
          <li>
            <a href="http://www.ktr.or.kr" target="_blank" rel="noreferrer">
              <img src="/assets/images/ft-banner05.png" alt="KTR" />
            </a>
          </li>
          <li>
            <a href="https://www.kcledu.re.kr" target="_blank" rel="noreferrer">
              <img src="/assets/images/ft-banner06.png" alt="KCL" />
            </a>
          </li>
          <li>
            <a href="http://www.ktc.re.kr" target="_blank" rel="noreferrer">
              <img src="/assets/images/ft-banner07.png" alt="KTC" />
            </a>
          </li>
          <li>
            <a href="https://www.fiti.re.kr" target="_blank" rel="noreferrer">
              <img src="/assets/images/ft-banner02.png" alt="FITI" />
            </a>
          </li>
          <li>
            <a
              href="http://www.kotiti-global.com"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/assets/images/ft-banner03.png" alt="KOTTI" />
            </a>
          </li>
        </ul>
      </div>

      <div className="inner">
        <div className="logo">
          <img
            src="/assets/images/ft-logo.png"
            alt="시험인증 빅데이터 플랫폼"
          />
        </div>
        <div className="copyright">
          <ul>
            <li>
              <a href="#!" onClick={e => e.preventDefault()}>
                플랫폼 소개
              </a>
            </li>
            <li>
              <a
                href="#!"
                onClick={e => e.preventDefault()}
                className="user-guide"
                data-key="TTC001"
              >
                이용약관
              </a>
            </li>
            <li>
              <a
                href="#!"
                onClick={e => e.preventDefault()}
                className="user-guide"
                data-key="TTC005"
              >
                개인정보처리방침
              </a>
            </li>
            <li>
              <a
                href="#!"
                onClick={e => e.preventDefault()}
                className="user-guide"
                data-key="TTC006"
              >
                저작권 정책
              </a>
            </li>
          </ul>
          <p>
            주소 : 서울특별시 동대문구 왕산로 51(용두동) 사업자등록번호
            204-82-01330 TEL 02-3668-3000 FAX 02-3668-2900~1
            <br />
            COPYRIGHT 2022 KATRI. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default BottomLayout;
