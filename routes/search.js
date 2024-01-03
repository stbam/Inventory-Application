var express = require('express');
var router = express.Router();
const pokesearch = require('../controllers/pokesearch')
/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("create")
  res.render('search');
});


router.post('/delete',pokesearch.pokemon_delete );
router.get('/list',pokesearch.pokemon_list);

/*router.get("/individualPokemon", function (req, res,next) {
  res.send("testatdsa");
}); */
router.post("/individualPokemon",pokesearch.update_pokemon);
router.get("/individualPokemon",pokesearch.single_pokemon);


router.post('/',pokesearch.create_pokemon_post);

 
module.exports = router;




