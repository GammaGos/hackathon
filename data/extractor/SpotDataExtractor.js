var spotData = [];
var list = $("#searchResultContainer > div");
for (var i = 0; i < list.length; i++) {
	var item = $(list[i]);
	var pic = item.find(".search_ticket_caption a img").attr("src");
	var name = item.find(".search_ticket_title h2 > a").text();
	var link = item.find(".search_ticket_title h2 > a").attr("href");
	var addressName = item.find(".search_ticket_title h2 > span.adress_name").text();
	var rate = item.find(".search_ticket_title h2 > span.adress_name span.rate").text();
	var detailedAddress = item.find(".search_ticket_title > .adress").text();
	var exercise = item.find(".search_ticket_title > .exercise").text();
	var grade = item.find(".search_ticket_assess .grades em").text();
	var gradeDetail = item.find(".search_ticket_assess .grades").text();
	var commentLink = item.find(".search_ticket_assess .comment a").attr("href");

	var ticketList = item.find(".search_ticket_table tr[class=\"\"]");
	var tickets = [];
	for (var j = 0; j < ticketList.length; j++) {
		var t = $(ticketList[j]);
		var num = t.find(".num").text();
		var detail = t.find(".detail_pro_list a").text();
		var price = t.find(".base_price").text();
		tickets.push({
			num: num,
			detail: detail,
			price: price
		});
	}

	spotData.push({
		pic: pic,
		name: name,
		link: link,
		addressName: addressName,
		rate: rate,
		detailedAddress: detailedAddress,
		exercise: exercise,
		grade: grade,
		gradeDetail: gradeDetail,
		commentLink: commentLink,
		tickets: tickets
	});
}
console.log(JSON.stringify(spotData));
