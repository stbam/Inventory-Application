const Pokemon = require('../models/pokemon');

exports.create_pokemon_post = async (req, res, next) => {
    const { name, type, height, forms, weight,imageUrl } = req.body;

    try {
        const pokemon = new Pokemon({
            name: name,
            type: type,
            height: height,
            weight: weight,
            forms: forms,
            imageUrl:imageUrl,
        });


        await pokemon.save();
       // res.send("Pokemon created successfully"); //cant do this with res.redirect one signal per send
        res.redirect('/search/list');
    } catch (err) {
        next(err);
    }
};
exports.pokemon_list = async(req,res,next)=>{
    try{
        const allPokemon = await Pokemon.find();

       
       // res.json(allPokemon);

        res.render("pokedex",{ pokemonList: allPokemon}) //renders the list in pokedex.ejs

    }catch(e){
        next(e);
    }
};

exports.pokemon_delete = async (req, res, next) => {
    try {
        const delete_pokemon = await Pokemon.findOneAndDelete({ name: req.body.name });
        if (!delete_pokemon) {
            return res.status(404).send("Pokemon not found");
        }
       // res.send("Pokemon deleted successfully");
       res.redirect('/search/list')
        
    } catch (err) {
        next(err);
    }
};
exports.single_pokemon = async(req,res,next)=>{
    try{
        const get_pokemon = await Pokemon.aggregate([{$sample:{size:1}}]);

        // res.render("pokedex",{ pokemonList: allPokemon}) //renders the list in pokedex.ejs

        res.render('singlePokemon',{name:get_pokemon})
        if (random_pokemon.length === 0) {
            return res.status(404).send("No Pokemon found");
        }
    }
    catch(err){
        next(err);
    }
};
