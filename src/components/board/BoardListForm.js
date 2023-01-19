const BoardListForm = () => {
  return (
    <>
      <div className="mysvc-sch-wr">
        <table surmmary="" className="tbl">
          <tbody>
            <tr>
              <th>검색조건</th>
              <td>
                <select className="select">
                  <option>선택하세요</option>
                  <option>제목</option>
                  <option>제목 및 내용</option>
                </select>
              </td>
              <th>검색어</th>
              <td>
                <input type="text" placeholder="검색어를 입력하세요." />
              </td>
            </tr>

            <tr>
              <th>게시판 유형</th>
              <td>
                <select className="select">
                  <option>전체</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="btn-wr">
          <a href="" className="btn reset">
            초기화
          </a>
          <a href="" className="btn b-sch">
            검색
          </a>
        </div>

      </div>
    </>
  );
};

export default BoardListForm;
