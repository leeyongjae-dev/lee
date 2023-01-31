import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { fn_convertXss, fn_fileDownload } from "../../utils/CommonUtil";
import HeaderLayout from "../../components/layout/HeaderLayout";

const BoardDetail = () => {

    const navigate = useNavigate();
    const [state, setState] = useState({
        boardNo: "",
        title: "",
        cont : "",
        regDt: "",
        typeNm: "",
        fileList: [],
        fileImgList: []
    });

    const [searchParams] = useSearchParams();

    useEffect(() => {

        let targetBoardNo = searchParams.get("targetBoardNo");

        getBoardDetail(targetBoardNo);

    }, []);

    const getBoardDetail = (boardNo) => {
        
        axios({
			method: "get",
			url: `/localAdress/board/${boardNo}`,
		})
			.then((res) => {
                console.log('getBoardDetail : ', res.data.data);
                
                setState({
                    boardNo: res.data.data.boardNo,
                    title: res.data.data.title,
                    cont : res.data.data.cont,
                    regDt: res.data.data.regDt,
                    typeNm: res.data.data.typeNm,
                    fileList : res.data.data.listFileFile,
                    fileImgList : res.data.data.listFileImg
                });

			})
			.catch(() => {
				console.log('getBoardDetail : 실패함')
			})

    }

    const goBoardList = () => {
        navigate(`/board/boardList?${searchParams}`);
    }

    const goBoardReg = () => {
        navigate(`/board/boardReg?${searchParams}`);
    }

    const goBoardDelete = () => {

        let formData = new FormData();
        formData.append("boardNo", state.boardNo);

        axios({
			method: "delete",
			url: `/localAdress/board/deleteBoard`,
            data: formData
		})
            .then((res) => {

                console.log('goBoardDelete : ', res.data);

                if( res.data.resultCode === 200 && res.data.resultCode !== "" ) {

                    alert(res.data.resultMessage);
                    navigate(`/board/boardList`);

                } else {
                    alert(res.data.resultMessage);
                }

            })
            .catch(() => {
                console.log('goBoardDelete : 실패함')
            })

    }
    
    return (
        <>
            <HeaderLayout headerClass="sub-myservice" headerText="이용재 게시판" />

            <div id="cont" className="cont-myservice dtl-myservice">
                <div className="cont-platform-tit bMg80">
                    <h2 className="tit">게시글 상세</h2>
                </div>
                
                <h3 className="tit">상세 정보</h3>
                <div className="svc-info-dtl">
                    <table>
                        <caption>게시판 상세</caption>
                        <tbody>
                            <tr>
                                <th>제목</th>
                                <td>{state.title}</td>
                                <th>게시판 유형</th>
                                <td>{state.typeNm}</td>
                            </tr>

                            <tr>
                                <th>등록일자</th>
                                <td colSpan={3}>
                                    {state.regDt}
                                </td>
                            </tr>

                            <tr>
                                <th>내용</th>
                                <td 
                                    colSpan={3} 
                                    dangerouslySetInnerHTML={ {__html: fn_convertXss(state.cont)} }>
                                </td>
                            </tr>

                            <tr>
                                <th>첨부파일</th>
                                <td colSpan={3}>
                                    {
                                        state.fileList.length > 0 
                                        ?
                                        state.fileList.map((it) => 
                                            <a 
                                                key={it.fileSn} 
                                                onClick={(e)=>{ fn_fileDownload(it) }}
                                            >
                                                {it.orgnlFileNm}<br/>
                                            </a>
                                        )
                                        :
                                        "-"
                                    }
                                </td>
                            </tr>

                            <tr>
                                <th>첨부파일 이미지</th>
                                <td colSpan={3}>
                                    {
                                        state.fileImgList.length > 0 
                                        ?
                                        state.fileImgList.map((it) => 
                                            <a 
                                                key={it.fileSn}
                                                onClick={(e)=>{ fn_fileDownload(it) }}
                                            >
                                                {it.orgnlFileNm}<br/>
                                            </a>
                                        )
                                        :
                                        "-"
                                    }
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>

                <div className="btn-wr" style={{justifyContent:"center"}}>
                    <a onClick={(e) => { goBoardReg() }} className="btn">수정</a>
                    <a onClick={(e) => { goBoardList() }} className="btn cancel">목록</a>
                    <a onClick={(e) => { goBoardDelete() }} className="btn">삭제</a>
                </div>
                
            </div>

        </>
    )

}

export default BoardDetail;