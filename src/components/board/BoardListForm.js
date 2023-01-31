import React, { useContext, useState } from "react";
import { BoardListContext } from "../../pages/board/BoardList";
import { useSearchParams } from "react-router-dom";

const BoardListForm = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  
  const [searchType, setSearchType] = useState(searchParams.get('searchType') !== null ? searchParams.get('searchType') : '');
  const [searchBoardType, setSearchBoardType] = useState(searchParams.get('searchBoardType')!== null ? searchParams.get('searchBoardType') : '');
  const [searchKeyword, setSearchKeyword] = useState(searchParams.get('searchKeyword')!== null ? searchParams.get('searchKeyword') : '');

  const { setSearchParamData, setCurrPage } = useContext(BoardListContext);

  const goListFormSearch = () => {
    let param = "";

    if(searchType !== null && searchType !== '') param += `&searchType=` + searchType;
    if(searchKeyword !== null && searchKeyword !== '') param += `&searchKeyword=` + searchKeyword;
    if(searchBoardType !== null && searchBoardType !== '') param += `&searchBoardType=` + searchBoardType;

    setSearchParamData(param);
    setCurrPage(1);

  }

  const goListFormReset = () => {
    setSearchType("");
    setSearchBoardType("");
    setSearchKeyword("");
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
                        onChange={(e) => {
                            setSearchType(e.target.value);
                            searchParams.set( "searchType", e.target.value );
                            setSearchParams(searchParams);
                          }
                        } 
                        defaultValue={searchType}
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
                  onChange={(e) => 
                    {
                      setSearchKeyword(e.target.value);
                      searchParams.set( "searchKeyword", e.target.value );
                      setSearchParams(searchParams);
                    }
                  } 
                  defaultValue={searchKeyword} />
              </td>
            </tr>

            <tr>
              <th>게시판 유형</th>
              <td>
                <select className="select" 
                        name="searchBoardType" 
                        onChange={
                          (e) => 
                          {
                            setSearchBoardType(e.target.value);
                            searchParams.set( "searchBoardType", e.target.value );
                            setSearchParams(searchParams);
                          }
                        }
                        defaultValue={searchBoardType}>
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
