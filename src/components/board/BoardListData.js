import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { BoardListContext } from "../../pages/board/BoardList";

const BoardListData = ({ totCnt, boardData }) => {

  const navigate = useNavigate();

  const { paramData, setParamData } = useContext(BoardListContext);

  const goBoardDetail = (boardNo) => {
    
    let param = "targetBoardNo=" + boardNo + "&" + paramData;
    setParamData(param);
    navigate(`/board/boardDetail?${param}`);
  }

  const goRegBoard = () => {
    navigate(`/board/boardReg?${paramData}`);
  }

  return (
    <>
      <div className="board-info" style={{textAlign:"center", marginTop:-30}}>
        <a href="" className="btn" onClick={(e) => { goRegBoard() } }>
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
                <td></td>
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
