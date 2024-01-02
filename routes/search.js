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
router.post('/',pokesearch.create_pokemon_post);

module.exports = router;




