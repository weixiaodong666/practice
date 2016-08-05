$(function(){
	
	//点击返回上衣界面
	$(".back").click(function(){
		window.location.href = "../zouxiu.html";
	});
	
	//选项卡
	$(".pro-footer>div").click(function(){
		$(".pro-footer-nav").css("background","transparent")
							.eq($(this).index())
							.css("background","#e4366b");
		$(".pro-body section").css("display","none")
							  .eq($(this).index())
							  .css("display","block");
		var mySwiperLunbo = new Swiper(".pro-lunbo",{
				autoplay:1500,
				autoplayDisableOnInteraction:false,
				pagination:'.swiper-pagination',
				paginationClickable:true
		});
	});
	
	
	//调用ajax
	var goodsId = window.localStorage.getItem("goodsID");
	$.ajax({
		url: "http://datainfo.duapp.com/shopdata/getGoods.php",
		dataType:"jsonp",
		data:"goodsID=" + goodsId,
		success:function(data){
//			console.log(data);
			$(".pro-detail-banner").attr("src",data[0].goodsListImg)
			
			$(".price-tit").find("span").text(data[0].price)
						   .end().find("b").text(data[0].goodsName);
						   
			var discountNum = data[0].discount;
			if(discountNum == 0){
				discountNum = 10;
			}
			
			$(".price-discount").find("b").text(parseInt(data[0].price/(discountNum/10)))
								.end().find("i").text(data[0].discount)
								.end().find("em").text(data[0].buynumber)
			var ImgSrc = JSON.parse(data[0].goodsBenUrl)[0];	
			$(".pro-big-pic img").attr("src",ImgSrc);		   
			
			$(".detail p").text(data[0].detail);
			
			var lunboPic = JSON.parse(data[0].imgsUrl);
			console.log(lunboPic.length)
			var str = "";
			for(var i=0;i<lunboPic.length;i++){
				str += "<div class='swiper-slide'><img src='"+ lunboPic[i] +"'/></div>";
			}
				$(".pro-lunbo .swiper-wrapper").append(str);
//			mySwiperLunbo.update();
		}
	});
});
