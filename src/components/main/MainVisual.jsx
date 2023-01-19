const MainVisual = () => {
  return (
    <header id="header">
      <div id="pop-slide">
        <div className="pop-swiper swiper">
          <div className="swiper-wrapper" id="main-notice-area"></div>
          <div
            className="pop-page swiper-pagination"
            id="notice-pagination"
          ></div>
        </div>
      </div>
      <div id="main-mv">
        <div className="main-swiper-hdn">
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
          <div className="m-s-page swiper-pagination"></div>
          <div className="m-s-page2 swiper-pagination2"></div>
          <div className="btn-pause"></div>
        </div>
        <div className="main-swiper swiper">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div className="inr">
                <h2>시험인증 빅데이터 플랫폼</h2>
                <p>시험인증의 새로운 변화, 데이터를 통한 가치 창출</p>
              </div>
              <img
                src="/assets/images/main-mv01.png"
                className="pc-block"
                onError={() => {}}
                alt="메인비주얼이미지"
              />
              <img
                src="/upload/visual_mobile_img/20221221/d0639cc9-a274-48d4-903e-2762c1132da5.png"
                className="mo-block"
                onError={() => {}}
                alt="메인비주얼이미지"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainVisual;
