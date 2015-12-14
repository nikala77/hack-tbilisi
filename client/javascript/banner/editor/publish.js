$(function () {
	$("#publish-embed").on("click",function(){
		$("#publish-embed").addClass("publish-active");
		$("#publish-player").removeClass("publish-active");
		$("#publish-download").removeClass("publish-active");

		$(".embed-content").show();
		$(".player-content").hide();
		$(".download-content").hide();
	});

	$("#publish-player").on("click",function(){
		$("#publish-embed").removeClass("publish-active");
		$("#publish-player").addClass("publish-active");
		$("#publish-download").removeClass("publish-active");

		$(".embed-content").hide();
		$(".player-content").show();
		$(".download-content").hide();
	});

	$("#publish-download").on("click",function(){
		$("#publish-embed").removeClass("publish-active");
		$("#publish-player").removeClass("publish-active");
		$("#publish-download").addClass("publish-active");

		$(".embed-content").hide();
		$(".player-content").hide();
		$(".download-content").show();
	});

	$("#fixed").on("click",function(){
		$("#fixed").addClass("active");
		$("#responsive").removeClass("active");
	});

	$("#responsive").on("click",function(){
		$("#fixed").removeClass("active");
		$("#responsive").addClass("active");
	});

	/*$(".copy-btn").on("click",function(elementID){
		var hiddenInput = document.createElement("input");
		hiddenInput.setAtribute("value")
	});	*/
});