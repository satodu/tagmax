$(function(){
	let oTable =$('#tbUsers');
	oTable.DataTable();
	$("#addUser").click(function(){
		window.location.href = '/users/add';
	});
});

/**
* [createActions description] cria os botões de editar e excluir
* @param {[type]} object [description]
*/
function createActions(object){
	let html = "<button class='btn btn-sm btn-default' type='button' data-id='" + object._id + "'> <span class='glyphicon glyphicon-pencil'></span> Editar</button>";
	html += "<button class='btn btn-sm btn-default' type='button' data-id='" + object._id + "'> <span class='glyphicon glyphicon-trash'></span> Editar</button>";
	$("a").unbind().on('click', function(){
		if($(this).hasClass('btn-danger')){
			console.log("delete ", $(this).attr('data-id'));
		}
	});
	return html;
}

