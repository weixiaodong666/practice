$(function(){
	if(localStorage.getItem("userID") || sessionStorage.getItem("userID")){
		var myInfo = JSON.parse(localStorage.getItem("userInf"));
		$(".my-inf-top img").attr("src",myInfo.userimg_url);
		$(".myName").text(myInfo.userID);
		$(".myMoney").text(myInfo.code);
	}
});
