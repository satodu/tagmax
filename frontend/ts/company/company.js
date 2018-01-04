$(function(){
	$("#myTabs >ul>li").addClass('active');
	var oTable         = $("#tbCompanies");
	var oTableUser     = $("#tabUsers");
	var oTableCampaing = $("#tabCampaings");
	
	oTable.DataTable();
	oTableCampaing.DataTable();
	oTableUser.DataTable();
});