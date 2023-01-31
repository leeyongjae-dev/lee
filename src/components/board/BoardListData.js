import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { BoardListContext } from "../../pages/board/BoardList";
import { useSearchParams } from "react-router-dom";

const BoardListData = ({ totCnt, boardData }) => {

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { paramData, setSearchParamData } = useContext(BoardListContext);

  const goBoardDetail = (boardNo) => {
    
    let param = "";
    let paramBoardNo = searchParams.get('targetBoardNo');

    if( paramBoardNo !== '' && paramBoardNo !== null ) {

      searchParams.set( "targetBoardNo", boardNo );
      setSearchParams(searchParams);
      param = searchParams;

    } else {
      param = "targetBoardNo=" + boardNo + "&" + paramData;
    }

    setSearchParamData(param);
    navigate(`/board/boardDetail?${param}`);
  }

  const goRegBoard = () => {
    navigate(`/board/boardReg?${paramData}`);
  }

  return (
    <>
      <div className="board-info" style={{textAlign:"center", marginTop:-30}}>
        <a className="btn" onClick={(e) => { goRegBoard() } }>
          게시글 등록
        </a>
      </div>
      <div className="board-cont" id="board-lst">
        <table className="data-lst">
          <caption>번호, 게시판 유형, 제목, 날짜</caption>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>게시판 유형</th>
              <th>날짜</th>
            </tr>
          </thead>

          <tbody id="boardDataArea">
            {totCnt === 0 ? (
              <tr>
                <td colSpan={4}>데이터가 없습니다.</td>
              </tr>
            ) : (
              boardData.map((it, index) => (
                <tr key={it.boardNo} onClick={(e) => { goBoardDetail(it.boardNo) }} style={{cursor:"pointer"}}>
                  <td>{it.rownum}</td>
                  <td>{it.title}</td>
                  <td>{it.typeNm}</td>
                  <td>{it.regDt}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

BoardListData.defaultProps = {
  boardData: []
};

export default React.memo(BoardListData);
