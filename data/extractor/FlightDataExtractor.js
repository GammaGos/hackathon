var flightData = [];
var list=$("#J_flightlist2");
var items=list.find(".search_box_light");
for (var i=0; i<items.length; i++) {
	var item = $(items[i]);
	var company = item.find(".flight_logo").text();
	var flight = item.find(".J_flight_no").attr("data-flight");
	var departTime = item.find(".right strong.time").text();
	var departAirport = item.find(".right div:nth-child(2)").text();
	var arriveTime = item.find(".left strong.time").text();
	var arriveAirport = item.find(".left div:nth-child(2)").text();
	var price = item.find(".price span").text();
	flightData.push({
		company: company,
		flight: flight,
		departTime: departTime,
		departAirport: departAirport,
		arriveTime: arriveTime,
		arriveAirport: arriveAirport,
		price: price
	});
}
console.log(flightData);
console.log(JSON.stringify(flightData));