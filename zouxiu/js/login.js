$(function(){
	$(".login").click(function(){
		var isOk=false;
		if($(".userName-txt").val().match(/^ /) || $(".userName-txt").val()==""){
			$(".error-userName").text("账户名不能为空");
			isOk=false;
		}else{
			$(".error-userName").text("");
			isOk=true;
		}
		
		if($(".pwd-txt").val().length < 6){
			$(".error-pwd").text("密码长度不能小于6位");
			isOk=false;
		}else{
			$(".error-pwd").text("");
			isOk=true;
		}
		
		if(isOk){
			var baseUrl = "http://datainfo.duapp.com/shopdata/",
				aimUrl = baseUrl + "userinfo.php";
			$.ajax({
				type:"post",
				url:aimUrl,
				dataType:"json",
				data:"status=login&userID=" + $(".userName-txt").val() + "&password=" + $(".pwd-txt").val(),
				success:function(data){
					console.log(data)
					if(data==0){
						$(".error-userName").text("用户名不存在");
					}else{
						$(".error-userName").text("");
					}
					if(data==2){
						$(".error-pwd").text("用户名与密码不符");
					}else{
						$(".error-pwd").text("");
					}
					if(data !=0 && data !=2){
						localStorage.setItem("userInf",JSON.stringify(data));						
						var userObj = {
								userName:$(".userName-txt").val(),
								password:$(".pwd-txt").val()
							},
							userStr = JSON.stringify(userObj);
						if($(".rember-pwd input").prop("checked")){
							window.localStorage.setItem("zouxiuUser",userStr);
						}else{
							window.sessionStorage.setItem("zouxiuUser",userStr);
						}
						//遮罩层
						$(".login-mask").css("display","block").find("b").click(function(){
							$(".login-mask").css("display","none");
							//跳转页面
							window.location.href=window.localStorage.getItem("lastUrl");
						});
					}
				}
			});
		};
	});
	
	//显示密码
	$(".view-pwd").change(function(){
		if($(this).prop("checked")){
			$(".pwd-txt").attr("type","text");
		}else{
			$(".pwd-txt").attr("type","password");
		}
	});
	
	//点击进入注册页面
	$(".register").click(function(){
		window.location.href = "../html/register.html";
	});
});
