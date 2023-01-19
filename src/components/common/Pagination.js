import React, { useContext } from "react";
import { BoardListContext } from "../../pages/board/BoardList";

const Pagination = ({ totCnt, currPage, rowCount }) => {

  /** ===== Context사용 */
  //setCurrPage 함수
  const { setCurrPage } = useContext(BoardListContext);

  //한 화면에 나올 페이지수(1 2 3 4 5 이런거)
  let pagePerBlcok = 5;

  // 페이징 관련 디폴트 값 설정
  if (currPage <= 0) currPage = 1;

  // 총 페이지 수 계산
  let totalPage = Math.ceil(parseInt(totCnt) / parseInt(rowCount));
  // 현재 페이지 블럭 번호
  let currBlock = Math.ceil(parseInt(currPage) / parseInt(pagePerBlcok));

  // 총 블럭 수
  let totalBlcok = Math.ceil(parseInt(totalPage) / parseInt(pagePerBlcok));

  // 현재 블록의 시작 페이지
  let startPage = (currBlock - 1) * pagePerBlcok + 1;
  // 현재 블록의 마지막 페이지
  let endPage = startPage + pagePerBlcok - 1;
  if (endPage > totalPage) endPage = totalPage;
  // 페이지 범위 만들기
  let arrPage = [];
  for (let i = startPage; i <= endPage; i++) {
    arrPage.push(i);
  }

  return (
    <>
      <div className="btn-wr paging">
        <div className="paging_wrap" id="areaMyCertPaging">
          {
            currBlock > 1 ?
              <div className='prev_btn_wrap' onClick={() => setCurrPage((currBlock - 1) * pagePerBlcok)} >
                <i className='prev_btn'></i>
                <span>Pre</span>
              </div>
              :
              ""
          }

          <ol>
            {
              endPage === 0 ?
                <li><a href="#!" className='active' >1</a></li>
                :
                arrPage.map((page, index) => {
                  return (page === currPage ?
                    <li key={page}><a href="#!" className='active'> {page} </a></li>
                    :
                    <li key={page} > <a href="#!" onClick={() => setCurrPage(page)}>  {page} </a></li>
                  )
                })
            }
          </ol>

          {
            currBlock < totalBlcok ?
              <div className='next_btn_wrap' onClick={() => setCurrPage(((currBlock * pagePerBlcok) + 1))}>
                <span>Next</span>
                <i className='next_btn'></i>
              </div>
              :
              ""
          }
        </div>
      </div>
    </>
  );
};

export default React.memo(Pagination);