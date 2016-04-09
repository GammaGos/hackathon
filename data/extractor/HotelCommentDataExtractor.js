var commentData = [];
var list = $(".comment_block")
for (var i = 0; i < list.length; i++) {
	var item = $(list[i]);
	var photo = item.find(".head img").attr("src");
	var name = item.find(".name").text();
	var commentDetailedScore = item.find(".comment_title .small_c").attr("data-value");
	var commentScore = item.find(".comment_title .score .n").text();
	var room = item.find(".comment_title .room").attr("data-baseroomname");
	var date = item.find(".comment_title .date").text();
	var type = item.find(".comment_title .type").text();
	var commentTxt = item.find(".comment_txt_detail").text();
	var commentTime = item.find(".comment_bar_info .time").text();
	var useful = item.find("a.useful").attr("data-voted");

	var pics = [];
	var picItems = item.find(".comment_pic .pic");
	for (var j = 0; j < picItems.length; j++) {
		var img = $(picItems[j]).find("img").attr("src");
		pics.push({
			img: img
		});
	}

	commentData.push({
		photo: photo,
		name: name,
		commentDetailedScore: commentDetailedScore,
		commentScore: commentScore,
		room: room,
		date: date,
		type: type,
		commentTxt: commentTxt,
		commentTime: commentTime,
		useful: useful,
		pics: pics
	});
}
console.log(JSON.stringify(commentData));
