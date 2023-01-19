export const fn_convertXss = (text) => {

	if(text !== 'undefined' && text !== ''  && text !== undefined ){
		 text = text.replace(/&amp;/ig, "&");
		 text = text.replace(/&lt;/ig, "<");
		 text = text.replace(/&gt;/ig, ">");
		 text = text.replace(/&#34;/ig, "\"");
		 text = text.replace(/&#39;/ig, "\'");
		 text = text.replace(/null;/ig, "%00");
		 text = text.replace(/&#37;/ig, "%");
		 text = text.replace(/&#37;/ig, "%");
		 text = text.replace(/&quot;/ig, "\"");
		 text = text.replace(/&middot;/ig, "·");
//		 text = text.replace(/&nbsp;/ig, " ");
		 text = text.replace("<script>", "&lt;script&gt;");
		 text = text.replace("</script>", "&lt;/script&gt;");
		 text = text.replace(/&deg;/ig, "°");

	}

	 return text;
}

export const fn_fileDownload = (fileObj) => {
    
    const fileDownUrl = `/localAdress/file/downloadFile?encodeFileSn=${fileObj.encodeFileSn}`;
    const downloadElement = document.createElement('a');

    downloadElement.href = fileDownUrl;
    downloadElement.download = fileObj.orgnlFileNm;
    downloadElement.setAttribute('type', 'application/json');
    downloadElement.click();

}