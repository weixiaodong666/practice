$(function(){
	$(".toLogin").click(function(){
		var isOk=false;
		if($("#userNameTxt").val().match(/^ /) || $("#userNameTxt").val()==""){
			$(".error-login-userName").text("账户名不能为空");
			isOk=false;
		}else{
			$(".error-login-userName").text("");
			isOk=true;
		}
		
		if($("#pwdTxt").val().length < 6){
			$(".error-login-pwd").text("密码长度不能小于6位");
			isOk=false;
		}else{
			$(".error-login-pwd").text("");
			isOk=true;
		}
		
		if($("#pwdAgainTxt").val() != $("#pwdTxt").val()){
			$(".error-login-again-pwd").text("再次密码输入不正确");
			isOk=false;
		}else{
			$(".error-login-again-pwd").text("");
			isOk=true;
		}
		if(isOk){
			//将账户名和密码发送致服务器
			var baseUrl= "http://datainfo.duapp.com/shopdata/",
				aimUrl=baseUrl+"userinfo.php";
			$.ajax({
				type:"post",
				url:aimUrl,
				data:"status=register&userID=" + $("#userNameTxt").val() + "&password=" + $("#pwdTxt").val(),
				success:function(data){
//					console.log(data);
					if(data==0){
						$(".error-login-userName").text("用户名重名！");
					}
					if(data==1){	
						$(".error-login-userName").text("");
						$(".success-mask").css("display","block").click(function(){
							$(this).css("display","none");
							//跳转到登录界面
							window.location.href="http://www.baidu.com";
										
						});
					}
				}
			});
		}
	});
});
