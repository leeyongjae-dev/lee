import { Form, Link, useNavigate, useSearchParams } from "react-router-dom";
import { Editor } from '@toast-ui/react-editor';
import axios from "axios";
import '@toast-ui/editor/dist/toastui-editor.css';
import HeaderLayout from "../../components/layout/HeaderLayout";
import { useEffect, useRef, useState } from "react";
import { fn_convertXss } from "../../utils/CommonUtil";

const BoardReg = () => {
    
    /*
    * 검색 조건 > query string 선언
    */
    const [searchParams, setSearchParams] = useSearchParams();
    
    /*
    * navigate 선언
    */
    const navigate = useNavigate();

    /*
    * 게시글 등록 값 state 선언
    */
    const [state, setState] = useState({
        boardNo: "",
        title: "",
        cont : "",
        regDt: "",
        typeCd:"",
        typeNm: "",
        board_file: [],
        board_img: []
    });
    
    /*
    * 현재 게시물 번호 값 셋팅 후 상세 조회
    */
    useEffect(() => {

        const targetBoardNo = searchParams.get("targetBoardNo");
        
        if( targetBoardNo !== "" && targetBoardNo !== null ) {
            getBoardDetail(targetBoardNo);
        } else {
            setState({...state});
        }
    }, []);

    /*
    * 함수명 : getBoardDetail
    * 설명 : 상세 조회 후 값 셋팅
    */
    const getBoardDetail = (boardNo) => {
        
        axios({
			method: "get",
			url: `/localAdress/board/${boardNo}`,
		})
			.then((res) => {
                console.log('getBoardDetail : ', res.data.data);

                editorRef.current.getInstance().setHTML( fn_convertXss(res.data.data.cont) );

                setState({
                    boardNo: res.data.data.boardNo,
                    title: res.data.data.title,
                    cont : res.data.data.cont,
                    regDt: res.data.data.regDt,
                    typeCd: res.data.data.typeCd,
                    typeNm: res.data.data.typeNm,
                    board_file : res.data.data.listFileFile,
                    board_img : res.data.data.listFileImg
                });

			})
			.catch(() => {
				console.log('getBoardDetail : 실패함')
			})
    }

    /*
    * 함수명 : goBoardList
    * 설명 : 목록 조회
    */
    const goBoardList = () => {
        navigate(`/board/boardList?${searchParams}`);
    }

    /*
    * 참조 값 선언
    */
    const editorRef = useRef();
    const boardFromRef = useRef();

    /*
    * 함수명 : handleChangeState
    * 설명 : 값 입력 시, state 셋팅
    */
    const handleChangeState = (e) => {
        setState({
          ...state,
          [e.target.name]: e.target.value,
        });
    };
    
    /*
    * 함수명 : editorChangeState
    * 설명 : 에디터 값 입력 시, html 변환 후 state 셋팅
    */
    const editorChangeState = () => {
        const data = editorRef.current.getInstance().getHTML();
        setState({ 
            ...state,
            cont : data
        })
    }

    /*
    * 함수명 : goBoardSave
    * 설명 : 등록/수정 게시글 저장
    */
    const goBoardSave = () => {
        
        console.log('saveBoardData : ', state);

        let formData = new FormData(boardFromRef.current);
        formData.append("cont", state.cont);

        axios({
            headers: {
                "Contest-Type": "multipart/form-data"    //파일전송시 필요
            },
			method  : "post",
			url     : "/localAdress/board/saveBoard",
            data    : formData
		})
			.then((res) => {

                console.log('goBoardSave : ', res.data);

                if( res.data.data.boardNo !== null && res.data.data.boardNo !== "" ) {
                    alert(res.data.resultMessage);

                    searchParams.set("targetBoardNo", res.data.data.boardNo );
                    setSearchParams(searchParams);

                    navigate(`/board/boardDetail?${searchParams}`);

                } else {
                    alert(res.data.resultMessage);
                }

			})
			.catch(() => {
				console.log('goBoardSave : 실패함')
			})
    }

    return (
        <>
            <HeaderLayout headerClass="sub-myservice" headerText="이용재 게시판" />
            
            <form name="frmBoard" ref={boardFromRef}>
                <input type="hidden" name="boardNo" value={searchParams.get("targetBoardNo")} />
                <div id="cont" className="cont-myservice dtl-myservice">
                    <div className="cont-platform-tit bMg80">
                        {
                            searchParams.get("targetBoardNo") === '' || searchParams.get("targetBoardNo") === null
                            ? 
                            <h2 className="tit">게시글 등록</h2>
                            :
                            <h2 className="tit">게시글 수정</h2>
                        }
                    </div>
                    {
                        searchParams.get("targetBoardNo") === '' || searchParams.get("targetBoardNo") === null
                        ? 
                        <h3 className="tit">등록 정보</h3>
                        :
                        <h3 className="tit">수정 정보</h3>
                    }
                    
                    <div className="svc-info-dtl">
                        <table>
                            <caption>게시판 등록</caption>
                            <tbody>
                                <tr>
                                    <th>제목</th>
                                    <td>
                                        <input type="text" name="title" defaultValue={state.title} onChange={handleChangeState}/>
                                    </td>
                                    <th>게시판 유형</th>
                                    <td>
                                        <select className="select" name="typeCd" style={{width:250, paddingLeft: 10}} defaultValue={state.typeCd} key={state.typeCd} onChange={handleChangeState}>
                                            <option value="">선택</option>
                                            <option value="ABOT1">공지사항</option>
                                            <option value="ABOT2">경고</option>
                                            <option value="ABOT3">질문사항</option>
                                        </select>
                                    </td>
                                </tr>

                                <tr>
                                    <th>내용</th>
                                    <td colSpan={3}>
                                        <Editor
                                            previewStyle="vertical"
                                            initialEditType="wysiwyg"
                                            useCommandShortcut={false}
                                            ref={editorRef}
                                            onChange={editorChangeState}
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <th>첨부파일</th>
                                    <td colSpan={3}>
                                        <input type="file" name="board_img"></input>
                                    </td>
                                </tr>

                                <tr>
                                    <th>첨부파일 이미지</th>
                                    <td colSpan={3}>
                                        <input type="file" name="board_file"></input>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>

                    <div className="btn-wr" style={{justifyContent:"center"}}>
                        <a onClick={(e) => { goBoardSave() }} className="btn">저장</a>
                        <a onClick={(e) => { goBoardList() }} className="btn cancel">취소</a>
                        {/* <Link to={`/board/boardList?${searchParams}`} className="btn cancel">취소</Link> */}
                    </div>
                    
                </div>
            </form>
        </>
    )
}

export default BoardReg;