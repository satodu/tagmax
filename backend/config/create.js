const companySchema = require('../api/company/model/companySchema');
const companyModel  = require('../api/company/model/companyModel')(companySchema, require('./ref/companyRef'));
const userSchema    = require('../api/user/model/userSchema');
const userModel     = require('../api/user/model/userModel')(userSchema, require('./ref/userRef'));

createCompany();

function createCompany(){
	//variaveis do company
	let nameCompany = 'Admin';
	let cnpj        = '14.318.593/0001-43';
	let responsible = 'admin';
	let phone_comm  = '+55 11 2125-6280';
	let email       = 'admin@admin.com.br';


	companyModel.findOne({name : nameCompany}, function(error, result){
		if(error){
			console.log('findOne ', error);
		}else{
			//se nao existir empresa com o nome InterAction, criamos ela
			if(!result){
				var company = new companyModel({
					name : nameCompany,
				    cnpj : cnpj,
				    responsible : responsible,
				    phone_comm : phone_comm,
				    email : email
			    });

			    company.save(function(error, company){
			    	if(error){
			    		console.log('save ', error);
			    	}
					console.log(company);
					createUser(company._id);
			    });
			}else{
				createUser(result._id);
			}
		}
	});
}

function createUser(company_id){
	let name       = "Administrador";
	let email      = "admin@admin.com.br";
	let phone      = "+55 11 2125-6280";
	let password   = "admin@admin";
	let permission = "super_admin";
	let filter     = {email : email};

	userModel.findOne(filter, function(error, result){
		if(error){ 
			console.log('user findOne ', error);
		}else{
			if(!result){
				var user = new userModel({
					name       : name,
				    email      : email,
				    phone      : phone,
				    permission : permission,
				    password   : password,
				    company_id : company_id
				});

				user.save(function(error, user){
					if(error){
						console.log('user save ', error);
					}
					console.log(user);
				});
			}
		}
	});
}