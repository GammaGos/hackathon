var hotelData = [];
var list=$("#hotel_list .searchresult_list");
for （var i = 0; i < list.length; i++) {
	var item = $(list[i]);
	var pic = item.find(".hotel_pic a img").attr("src");
	var name = item.find(".hotel_pic a").attr("title");
	var link = item.find("h2 a").attr("href");
	var address = item.find(".searchresult_htladdress").text();	
	var price = item.find(".hotel_price").text();
	var value = item.find(".hotel_value").text();
	var judgementScore = item.find(".total_udgement_score").text();
	var judgement = item.find(".total_udgement").text();

	hotelData.push({
		pic: pic,
		name: name,
		link: link,
		address: address,
		price: price,
		value: value,
		judgementScore: judgementScore,
		judgement: judgement
	});
}
