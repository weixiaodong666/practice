$(function(){
	$(".log-out").click(function(){
		window.localStorage.removeItem("zouxiuUser");
	});
	
	if(localStorage.getItem("userID") || sessionStorage.getItem("userID")){
		$(".log-out").css("display","block");
	}
})
