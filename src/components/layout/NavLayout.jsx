import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, createSearchParams } from 'react-router-dom';

const NavLayout = () => {
  const navigate = useNavigate();

  const [gnbFixed, setGnbFixed] = useState(false);
  const [gnbOpened, setGnbOpened] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  const inputSearch = useRef(null);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setGnbFixed(true);
    } else {
      setGnbFixed(false);
    }
  };

  const handleToggleSearch = () => {
    setToggleSearch(prev => !prev);
  };

  const handleSearchPage = () => {
    if (!searchKeyword.length) {
      alert('검색어를 입력해주세요.');
      inputSearch.current.focus();
      return;
    }

    setToggleSearch(false);

    navigate({
      pathname: '/searchList',
      search: `${createSearchParams({
        searchKeyword: searchKeyword,
      })}`,
    });

    setSearchKeyword('');
  };

  useEffect(() => {
    const scrollListener = () => {
      window.addEventListener('scroll', handleScroll);
    }; //  window 에서 스크롤을 감시 시작

    scrollListener(); // window 에서 스크롤을 감시

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }; //  window 에서 스크롤을 감시를 종료
  });

  return (
    <nav
      id="nav"
      className={(gnbOpened ? 'fixed' : '') + (gnbFixed ? ' sticky' : '')}
      onMouseEnter={e => {
        e.preventDefault();
        setGnbOpened(true);
      }}
      onMouseLeave={e => {
        e.preventDefault();
        setGnbOpened(false);
      }}
    >
      <div className="line"></div>
      <div className="inner">
        <h1>
          <a href="/">로고</a>
        </h1>
        <ul className="gnb">
          <li>
            <span>
              <a onClick={e => navigate(`/board/boardList`)}>
                이용재 게시판
              </a>
            </span>
            <div className="snb">
              <dl>
                <dt>이용재</dt>
                <dd>
                  <a onClick={e => navigate(`/board/boardList`)}>
                    <span>React-Board</span>
                  </a>
                </dd>
              </dl>
            </div>
          </li>
        </ul>
        <div className="tnb">
          <ul>
            <li>
              <div
                className={toggleSearch ? 'inp-sch-wr active' : 'inp-sch-wr'}
              >
                <button
                  type="button"
                  className="btn-sch-close"
                  onClick={handleToggleSearch}
                >
                  닫기
                </button>
                <input
                  type="text"
                  ref={inputSearch}
                  value={searchKeyword}
                  onChange={e => setSearchKeyword(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      handleSearchPage();
                    }
                  }}
                  placeholder="검색어를 입력해 주세요"
                  className="inp-sch"
                  title="검색"
                />
                <button
                  type="button"
                  onClick={handleSearchPage}
                  className="btn-sch"
                >
                  검색
                </button>
              </div>
              <a href="#!" onClick={handleToggleSearch} className="ic sch on">
                <i>검색하기</i>
              </a>
            </li>
            <li>
              <Link to="/join/joinBsnoCheck" className="ic mypage">
                <div className="tool-tip">사업자조회</div>
                <i>사업자조회</i>
              </Link>
            </li>
          </ul>
          <button
            type="button"
            className="btn-sch"
            onClick={e => e.preventDefault()}
          >
            검색하기
          </button>
          <button type="button" className="btn-list">
            리스트
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavLayout;
