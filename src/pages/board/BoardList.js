import { createContext, useEffect, useState } from "react";
import axios from "axios";
import BoardListData from "../../components/board/BoardListData";
import BoardListForm from "../../components/board/BoardListForm";
import Pagination from "../../components/common/Pagination";
import HeaderLayout from "../../components/layout/HeaderLayout";
import { useSearchParams } from "react-router-dom";

export const BoardListContext = createContext(null);

const BoardList = () => {

  /*
  * 검색 조건 > query string 선언
  */
  let [initSearchParams] = useSearchParams();
  let initParam = initSearchParams !== '' ? initSearchParams : '';

  /*
  * List 셋팅 값 선언
  */
  const rowCount = 10;
  let [boardData, setBoardData] = useState([]);
  let [totCnt, setTotCnt] = useState(0);
  let [currPage, setCurrPage] = useState(1);
  let [searchParamData, setSearchParamData] = useState(initParam);
  let [paramData, setParamData] = useState("");

  /*
  * currPage, searchParamData 값 변동 시, List monut
  */
  useEffect(() => {
    getBoardList();
  }, [currPage, searchParamData]);

  /*
  * 함수명 : getBoardList
  * 설명 : 목록 조회
  */
  const getBoardList = () => {

    let param = "rowCount=" + rowCount + "&currPage=" + currPage + (searchParamData === "" ? "" : ("&" + searchParamData));

    setParamData(param);

    axios({
      method: "get",
      url: `/localAdress/board/getBoardList?${param}`,
    })
      .then((res) => {
        console.log('getBoardList : ', res.data.data);
        
        //총개수 셋팅
        setTotCnt(res.data.data.totCnt);

        //리스트 셋팅
        if (res.data.data.count === 0) {
          setBoardData([]);
        } else {
          setBoardData(res.data.data.list);
        }
      })
      .catch(() => {
        console.log("getBoardList : 실패함");
      });
  };

  return (

    <BoardListContext.Provider value={{ setSearchParamData, setCurrPage, paramData, setParamData }}>
      
      <HeaderLayout headerClass="sub-myservice" headerText="게시판" />

      <div id="container">
        <div id="cont" className="cont-myservice board-myservice board-data">
          <div className="cont-platform-tit bMg80">
            <h2 className="tit">게시판</h2>
          </div>

          <BoardListForm />
          <BoardListData totCnt={totCnt} boardData={boardData} />
          <Pagination totCnt={totCnt} currPage={currPage} rowCount={rowCount} setCurrPage={setCurrPage} />

        </div>
      </div>

    </BoardListContext.Provider>

  );
};

export default BoardList;
