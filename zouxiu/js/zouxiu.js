var mySwiper1,
	mySwiper2,
	mySwiper3,
	myIScroll;
$(function() {
	//进入网页时动画
	mySwiper1 = new Swiper(".show", {
		onInit: function(swiper) {
			swiperAnimateCache(swiper);
			swiperAnimate(swiper);
		}
	});

	//动画结束后此页自动消失或者点击时消失
	$(".show").click(function() {
		$(this).fadeOut("slow");
	});
	setTimeout(function() {
		$(".show").fadeOut("slow");
	}, 4000);

	//轮播图
	mySwiper2 = new Swiper(".lunbo", {
		onSlideChangeEnd: function(swiper) {
			swiperAnimate(swiper);
		},
		pagination: ".swiper-pagination",
		paginationClickable: true
	});

	//点击开始体验按钮
	$(".start").click(function() {
		$(".lunbo").fadeOut();
		window.location.href = "zouxiu.html";
	});

	//内容区滑动iscroll	
	myIScroll = new IScroll('#wrapper',{
		click:true
	});

	//banner轮播

	//调用ajax

	//调用轮播图接口
	var baseUrl = "http://datainfo.duapp.com/shopdata/getBanner.php";
	$.ajax({
		type: "GET",
		url: baseUrl,
		dataType: "jsonp",
		success: function(data) {
			var bannerHTML = "";
			for(var i = 0; i < data.length; i++) {
				bannerHTML += "<div class='swiper-slide'><img src='" 
							+ JSON.parse(data[i].goodsBenUrl)[0] + "'/></div>";
			}
			$(".banner-box").append(bannerHTML);
			mySwiper3 = new Swiper(".slide-banner", {
				loop: true,
				autoplay: 2000,
				pagination: ".swiper-pagination"
			})
		}
	});

	//调用商品列表接口
	$.ajax({
		type: "get",
		url: "http://datainfo.duapp.com/shopdata/getGoods.php",
//		data:'goodsID=4',
		dataType: "jsonp",
		success: function(data) {
			console.log(data)
			var str = "";
			for(var i = 0; i < data.length; i++) {
//			<li class="product-list">
//				<div class="product-item">
//					<div class="pro-left"><img src="" /></div>
//					<div class="pro-right">
//						<div class="pro-tit">0元抽大奖0元抽大奖0元抽大奖0元抽大奖0元抽大奖0元抽大奖0元抽大奖0元</div>
//						<div class="price">
//							<div class="price-left">
//								<div class="price-box">
//									<div class="now-price">￥<b>0</b></div>
//									<div class="old-price">￥<span>28888</span></div>
//								</div>
//								<div class="discount"><i>0</i>折</div>
//							</div>
//							<div class="price-right">
//								<a href="#" class="iconfont add-shop-bag">&#xe605;</a>
//							</div>
//						</div>
//					</div>
//				</div>
//				<input type="hidden" />
//			</li>
			var discount=data[i].discount;
			if(discount==0){
				discount=10;
			}
			str+="<li class='product-list'>";
			str+="<div class='product-item'>";
			str+="<div class='pro-left'><img src=" + data[i].goodsListImg + " /></div>";
			str+="<div class='pro-right'>";
			str+="<div class='pro-tit'>"  + data[i].goodsName + "</div>";
			str+="<div class='price'>";
			str+="<div class='price-left'>";
			str+="<div class='price-box'>";
			str+="<div class='now-price'>￥<b>"+ data[i].price +"</b></div>";
			str+="<div class='old-price'>￥<span>"+ ~~(data[i].price / (discount / 10)) +"</span></div>";
			str+="</div>";
			str+="<div class='discount'><i>"+ discount +"</i>折</div>";
			str+="</div>";
			str+="<div class='price-right'>";
			str+="<a href='#' class='iconfont add-shop-bag'>&#xe605;</a>";
			str+="</div></div></div></div>";	
			str+="<input type='hidden' class='hiddenGoodsID' value='"+ data[i].goodsID +"'/></li>";
			}
			$(".scroll-home ul").append(str);
			myIScroll.refresh();
		}
	});
	
	//点击列表时存储goodsID
	$(".scroll-home").on("click",".product-list",function(){
		var goodsId = $(this).find($(".hiddenGoodsID")).val();
		window.localStorage.setItem("goodsID",goodsId);
		window.location.href = "html/product-detail.html";
	})
	
	//点击添加购物车
	$(".scroll-home").on("click",".add-shop-bag",function(){
		if(localStorage.getItem("zouxiuUser") || sessionStorage.getItem("zouxiuUser")){
			var userID = "";
			if(localStorage.getItem("zouxiuUser")){
				userID = localStorage.getItem("zouxiuUser");
			}else{
				userID = sessionStorage.getItem("zouxiuUser");
			}
//			console.log(JSON.parse(userID).userName)
			//调用ajax更新购物车
			var dataStr = "userID=" + JSON.parse(userID).userName + "&goodsID="
						+$(this).closest(".product-list").find($(".hiddenGoodsID")).val() 
						+ "&number=1";
			$.ajax({
				type:"post",
				url:"http://datainfo.duapp.com/shopdata/updatecar.php",
				data:dataStr,
				success:function(data){
					console.log(data)
				}
			});
		}else{
			window.localStorage.setItem("lastUrl",window.location.href);
			$(".indexMask").css("display","block");
		}
			return false;
	})
	
	//点击这里跳转到登录界面
	$(".indexMask b").click(function(){
		$(".indexMask").css("display","none");
		window.location.href = "html/login.html";
	});
	
	//点击footer
	$("footer ul li").click(function() {
		$(".footerScrollbar").css("background", "transparent");
		$(this).find(".footerScrollbar").css("background", "#e43669");
	});

});