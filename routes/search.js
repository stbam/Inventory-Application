var express = require('express');
var router = express.Router();
const pokesearch = require('../controllers/pokesearch')
/* GET users listing. */
router.get('/', function(req, res, next) {
  
  res.render('search');
});

router.post('/',pokesearch.create_pokemon_post);

router.get('/list',pokesearch.pokemon_list);



module.exports = router;




