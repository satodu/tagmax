module.exports = function(app, passport){
	app.get('/', isAuthenticated, function(req, res){
		res.render('dashboard/index', {title: 'Dashboard', user : req.user});
	});

	/**
	 * Dashboard
	 */
	app.get('/dashboard', isAuthenticated, function(req, res){
		res.render('dashboard/index', {title: 'Dashboard', user : req.user});
	});

	/**
	 * Campaign
	 */
	app.get('/campaign', isAuthenticated, function(req, res){
	    res.render('campaign/index', {title: 'Campanhas', user : req.user});
	});

	app.get('/campaign/edit/:id', isAuthenticated, function(req, res){
	    res.render('campaign/edit', {title: 'Atualizar Campanhas', user : req.user});
	});

	app.get('/campaign/add', isAuthenticated, function(req, res){
	    res.render('campaign/add', {title: 'Cadastrar Campanhas', user : req.user});
	});

	app.get('/campaign/:id', isAuthenticated, function(req, res){
	    res.render('campaign/details', {title: 'Detalhe da Campanha', user : req.user});
	});

	app.get('/campaigntag/:id/add', isAuthenticated, function(req, res){
	    //res.render('campaigntags/index', {title: 'Add Campaign URL Form', user : req.user});
		res.render('campaigntags/add', {title: 'Add Campaign URL Form', user : req.user});
	});

	/**
	 * user
	 */
	app.get('/users', isAuthenticated, function(req, res){
		res.render('user/index', {title: 'Usuários', user : req.user});
	});

	app.get('/users/add', isAuthenticated, function(req, res){
		res.render('user/add', {title: 'Adicionar Novo Usuário', user : req.user});
	});

	app.get('/users/update/:id', isAuthenticated, function(req, res){
		res.render('user/update', {title: 'Atualizar Novo Usuário', _id : req.params.id, user : req.user});
	});

	app.get('/profile', isAuthenticated, function(req, res){
		res.render('user/profile', {title: 'Profile', user : req.session.passport.user});
	});

	/**
	 * COMPANY
	 */
	app.get('/companies', isAuthenticated, function(req, res){
		res.render('company/index', {title: 'Empresas', user : req.user});
	});

	app.get('/companies/add', isAuthenticated, function(req, res){
		res.render('company/add', {title: 'Adicionar Nova Empresa', user : req.user});
	});

	app.get('/companies/edit/:id', isAuthenticated, function(req, res){
		res.render('company/edit', {title: 'Atualizar Empresa', _id : req.params.id, user : req.user});
	});

	app.get('/companies/:id', isAuthenticated, function(req, res){
		res.render('company/details', {title: 'Empresa', _id : req.params.id, user : req.user});
	});

	/**
	 * LOGIN
	 */
	app.get('/login', function(req, res){
		res.render('login/index', {message : req.flash('Login Message')});
	});

	// process the login form
    app.post('/login', passport.authenticate('local-login',{
        successRedirect : '/dashboard', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true ,// allow flash messages
        session: true
    }));


	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/login');
	});
};

//route middleware to make sure a user is logged in
function isAuthenticated(req, res, next){
	//if user is authenticated in the session, carry on
	if(req.isAuthenticated()){
		return next();
	}
	//if they aren't redirect them to the home page
	req.logout();
	res.redirect('/login');
}
