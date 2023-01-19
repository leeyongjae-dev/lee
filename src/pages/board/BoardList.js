import { createContext, useEffect, useState } from "react";
import axios from "axios";
import BoardListData from "../../components/board/BoardListData";
import BoardListForm from "../../components/board/BoardListForm";
import Pagination from "../../components/common/Pagination";
import { useSearchParams } from "react-router-dom";
import HeaderLayout from "../../components/layout/HeaderLayout";

export const BoardListContext = createContext(null);

const BoardList = () => {
  let [boardData, setBoardData] = useState([]);
  let [totCnt, setTotCnt] = useState(0);
  let [currPage, setCurrPage] = useState(1);
  let [searchParamData, setSearchParamData] = useState("");
  let [paramData, setParamData] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const rowCount = 10;

  useEffect(() => {
    getBoardList();
  }, [currPage, searchParamData]);

  const getBoardList = () => {
    
    let param = "rowCount=" + rowCount + "&currPage=" + currPage + (searchParamData === "" ? "" : "&" + searchParamData);
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
      
      <HeaderLayout headerClass="sub-myservice" headerText="이용재 게시판" />

      <div id="container">
        <div id="cont" className="cont-myservice board-myservice board-data">
          <div className="cont-platform-tit bMg80">
            <h2 className="tit">게시판</h2>
          </div>

          <BoardListForm />
          <BoardListData totCnt={totCnt} boardData={boardData} />
          <Pagination totCnt={totCnt} currPage={currPage} rowCount={rowCount} />

        </div>
      </div>

    </BoardListContext.Provider>

  );
};

export default BoardList;
