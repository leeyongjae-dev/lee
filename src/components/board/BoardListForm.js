import React, { useContext, useState } from "react";
import { BoardListContext } from "../../pages/board/BoardList";
import { useSearchParams } from "react-router-dom";

const BoardListForm = () => {

  /*
  * 검색 조건 > query string 선언
  */
  const [searchParams, setSearchParams] = useSearchParams();
  
  /*
  * 검색 값 state 선언
  */
  const [ searchState, setSearchState] = useState({
    searchType : searchParams.get('searchType') !== null ? searchParams.get('searchType') : ''
    , searchBoardType : searchParams.get('searchBoardType')!== null ? searchParams.get('searchBoardType') : ''
    , searchKeyword : searchParams.get('searchKeyword')!== null ? searchParams.get('searchKeyword') : ''
  })

  /*
  * List context 선언
  */
  const { setSearchParamData, setCurrPage } = useContext(BoardListContext);

  /*
  * 함수명 : goListFormSearch
  * 설명 : 검색 조건 값 셋팅 후 (상위 useEffect() 목록 조회)
  */
  const goListFormSearch = () => {
    let param = "";

    if(searchState.searchType !== null && searchState.searchType !== '') param += `&searchType=` + searchState.searchType;
    if(searchState.searchKeyword !== null && searchState.searchKeyword !== '') param += `&searchKeyword=` + searchState.searchKeyword;
    if(searchState.searchBoardType !== null && searchState.searchBoardType !== '') param += `&searchBoardType=` + searchState.searchBoardType;

    setSearchParamData(param);
    setCurrPage(1);

  }

  /*
  * 함수명 : goListFormReset
  * 설명 : 검색 조건 값 초기화
  */
  const goListFormReset = () => {
    setSearchState({
      searchType : ''
    , searchBoardType : ''
    , searchkeyword : ''
    });
  }

  /*
  * 함수명 : handleChangeParams
  * 설명 : 입력 시, 검색 조건 state, param 값 셋팅
  */
  const handleChangeParams = (e) => {
    setSearchState({
      ...searchState
      , [e.target.name] : e.target.value
    });
    searchParams.set(`${e.target.name}`, e.target.value );
    setSearchParams(searchParams);
  }

  /*
  * 함수명 : goEnterListFormSearch
  * 설명 : Enter키 event
  */
  const goEnterListFormSearch = (e) => {
    if( e.key === 'Enter') {
      goListFormSearch();
    }
  }

  return (
    <>
      <div className="mysvc-sch-wr">
        <table surmmary="" className="tbl">
          <tbody>
            <tr>
              <th>검색조건</th>
              <td>
                <select className="select" 
                        name="searchType" 
                        onChange={handleChangeParams}
                        defaultValue={searchState.searchType}
                  >
                  <option value="">선택하세요</option>
                  <option value="title">제목</option>
                  <option value="titleCont">제목 및 내용</option>
                </select>
              </td>
              <th>검색어</th>
              <td>
                <input 
                  type="text" 
                  placeholder="검색어를 입력하세요." 
                  name="searchKeyword" 
                  onChange={handleChangeParams}
                  onKeyDown={goEnterListFormSearch}
                  defaultValue={searchState.searchKeyword}
                  />
              </td>
            </tr>

            <tr>
              <th>게시판 유형</th>
              <td>
                <select className="select" 
                        name="searchBoardType" 
                        onChange={handleChangeParams}
                        defaultValue={searchState.searchBoardType}>
                  <option value="">전체</option>
                  <option value="ABOT1">공지사항</option>
                  <option value="ABOT2">경고</option>
                  <option value="ABOT3">질문사항</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="btn-wr">
          <a href="#!" className="btn reset" onClick={goListFormReset}>
            초기화
          </a>
          <a href="#!" className="btn b-sch" onClick={goListFormSearch}>
            검색
          </a>
        </div>

      </div>
    </>
  );
};

export default React.memo(BoardListForm);
