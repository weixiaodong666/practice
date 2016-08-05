var sortListWrap,
	sortListCutton;
$(function(){
	var sortNav = new Swiper(".sort-nav",{
		slidesPerView:8,
		onTap:function(swiper,event){
			//点击切换
			sortContent.slideTo(sortNav.clickedIndex,200);
			//颜色
			$(".sort-nav .swiper-slide").css("color","#000").eq(sortNav.clickedIndex).css("color","#fff");
		}
	});
	var sortContent = new Swiper(".sort-content",{
		onSlideChangeEnd:function(swiper){
			sortNav.slideTo(sortContent.activeIndex);
			$(".sort-nav .swiper-slide").css("color","#000").eq(sortContent.activeIndex).css("color","#fff");			
		}
	});
	
	
	var baseUrl = "http://datainfo.duapp.com/shopdata/",
		proUrl = baseUrl+"getGoods.php";
	$.ajax({
		type:"get",
		url:proUrl,
		dataType:"jsonp",
		success:function(data){
//			console.log(data);
			for(var i=0;i<data.length;i++){	
				var discount=data[i].discount;
				if(discount==0){
					discount=10;
				}
				var str="";
				str +="<figure>";
				str +="<img src='"+ data[i].goodsListImg +"'/>";
				str +="<figcaption>"+ data[i].goodsName +"</figcaption>";
				str +="<div class='pro-price'>";
				str +="<div class='pro-nowPrice'>";
				str +="￥<b>"+ data[i].price +"</b>";
				str +="</div><div class='pro-oldPrice'>";
				str +="￥<span>"+ ~~(data[i].price/(discount/10)) +"</span>";
				str +="</div></div>";
				str +="<input type='hidden' value='"+ data[i].goodsID +"'/></figure>";
				$(".sort-list-new").append(str);
				if(data[i].className=="棉服"){
					$(".sort-list-cotton").append(str);
//					console.log(data[i].className)
				};
				if(data[i].className=="短外套"){
					$(".sort-list-short").append(str);
				};
				if(data[i].className=="礼服"){
					$(".sort-list-lifu").append(str);
				}
				if(data[i].className=="衬衫"){
					$(".sort-list-shirt").append(str);
				}
				if(data[i].className=="卫衣"){
					$(".sort-list-weiyi").append(str);
				}
			}
			$(".sort-list-new").height($(".sort-list-box figure").height()*Math.ceil(data.length/2-1));
			sortListWrap.refresh();
		}
	});
	
	//加载分类
//	$.ajax({
//		type:"get",
//		url:"http://datainfo.duapp.com/shopdata/getclass.php",
//		success:function(data){
//			console.log(data);
//		}
//	});
	
	//点击列表进入详情页
	$(".sort-list-box").on("click","figure",function(){
//		console.log($(this).find("input").val());
		localStorage.setItem("goodsID",$(this).find("input").val());
		window.location.href="product-detail.html";
	})
	
	var sortList = new Swiper(".sort-list",{
		direction:"vertical"
	});
	
	sortListWrap = new IScroll(".sort-list-wrap",{
		click:true
	});
});
