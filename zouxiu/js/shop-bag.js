$(function(){
	var  shopBagList = new Swiper(".shop-bag-list",{
		direction:"vertical",
		slidesPerView:3.6
	});
	
	//判断有没有登录
		var userID = "";
	if(localStorage.getItem("zouxiuUser") || sessionStorage.getItem("zouxiuUser")){		
		if(localStorage.getItem("zouxiuUser")){
			userID = localStorage.getItem("zouxiuUser");
		}else{
			userID = sessionStorage.getItem("zouxiuUser");
		}
		//调用ajax
		$.ajax({
			type:"get",
			url:"http://datainfo.duapp.com/shopdata/getCar.php",
			data:"userID=" + JSON.parse(userID).userName,
			dataType:"jsonp",
			success:function(data){
				//判断购物车有没有商品
				if(data == 0){
					$(".no-pro").css("display","block");
				}else{
					for(var i = 0;i<data.length;i++){
						var str = "";
						str += "<div class='swiper-slide shop-bag-item'>";
						str += "<div class='shop-bag-item-left'>";
						str += "<img src='"+ data[i].goodsListImg +"' />";
						str += "</div><div class='shop-bag-item-right'>";
						str += "<p class='cloth-tit'>"+ data[i].goodsName +"</p>";
						str += "<div class='cloth-className'>"+ data[i].className +"</div>";
						str += "<div class='cloth-single-price'>￥<span>"+ data[i].price +"</span></div>";
						str += "<div class='cloth-number'>数量：";
						str += "<span class='cloth-number-decrease'>-</span>";
						str += "<i>"+ data[i].number +"</i>";
						str += "<span class='cloth-number-increase'>+</span>";
						str += "</div><div class='delete-btn iconfont'>&#xe60c;</div>";
						str += "</div><input type='hidden' value='"+ data[i].goodsID +"'</div>";
						
						$(".shop-bag-list .swiper-wrapper").append(str);
					}
					shopBagList.updateSlidesSize();
					allM();
				}
			}
		})	
	}else{
		//弹出这招层
		$(".shop-bag-mask").css("display","block").find("b").click(function(){
			localStorage.setItem("lastUrl",window.location.href);
			window.location.href = "login.html";
			$(".shop-bag-mask").css("display","none");
		});
	}
	
	//数量加减
	$(".shop-bag-list").on("click",".cloth-number-decrease",function(){
		$(this).next().text(parseInt($(this).next().text())-1);
			if($(this).next().text()<=1){
				$(this).next().text(1);
			};
		allM();
	})
	$(".shop-bag-list").on("click",".cloth-number-increase",function(){
		$(this).prev().text(parseInt($(this).prev().text())+1);
		allM();
	});
	

	
	//点击删除购物车
	$(".shop-bag-list").on("click",".delete-btn",function(){
		var del = $(this).closest(".shop-bag-item").find("input").val();
		$.ajax({
			type:"post",
			url:"http://datainfo.duapp.com/shopdata/updatecar.php",
			data:"userID=" + JSON.parse(userID).userName + "&goodsID=" + del +"&number=0",
			success:function(data){
				if(data == 1){
					console.log("删除成功");			
				}else{
					console.log("删除失败");
				}
			}
		});		
		$(this).closest(".shop-bag-item").remove();
		allM();
	});	
	
	//计算总价格/总数量函数
	function allM(){
		var allMoney=0,
			allNumber=0;
		for(var i = 0; i < $(".cloth-single-price span").length; i++){
			allMoney += $(".cloth-single-price span").eq(i).text()*$(".cloth-number i").eq(i).text();
			allNumber += parseInt($(".cloth-number i").eq(i).text());
		}
		$(".proInf b").text(allMoney);
		$(".proInf span").text(allNumber);
	};	
});
