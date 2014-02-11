var Github = require('github-api')

var github = new Github({
  username: "anits-abhinand",
  password: "Anupam08",
  auth: "basic"
});
var repo = github.getRepo("anits-abhinand", "testapp");

var r=repo.read('master', 'helloworld.html', function(err, data) {
	if(!err){
		console.log(data);
	}
	else{
		console.log(err)
	}
});