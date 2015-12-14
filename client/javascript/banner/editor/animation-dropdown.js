$(function (){

	$('.dropdown-menu').click(function(e) {
        e.stopPropagation();
    });

	$("#enter-stage").on("click",function(){
		$("#enter-stage").addClass("active");
		$("#exit-stage").removeClass("active");
		$("#complex").removeClass("active");

		$("#enter-stage-content").show();
		$("#exit-stage-content").hide();
		$("#complex-content").hide();
	});

	$("#exit-stage").on("click",function(){
		$("#enter-stage").removeClass("active");
		$("#exit-stage").addClass("active");
		$("#complex").removeClass("active");

		$("#enter-stage-content").hide();
		$("#exit-stage-content").show();
		$("#complex-content").hide();
	});

	$("#complex").on("click",function(){
		$("#enter-stage").removeClass("active");
		$("#exit-stage").removeClass("active");
		$("#complex").addClass("active");

		$("#enter-stage-content").hide();
		$("#exit-stage-content").hide();
		$("#complex-content").show();
	});

	$("#animation-close-btn").on("click",function(){
		$(".animations-dropdown").removeClass("open");
	});
});