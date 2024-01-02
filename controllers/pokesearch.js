const Pokemon = require('../models/pokemon');

exports.create_pokemon_post = async (req, res, next) => {
    const { name, type, height, forms, weight } = req.body;

    try {
        const pokemon = new Pokemon({
            name: name,
            type: type,
            height: height,
            weight: weight,
            forms: forms,
        });

        await pokemon.save();
        res.send("Pokemon created successfully");
    } catch (err) {
        next(err);
    }
};

exports.pokemon_list = async(req,res,next)=>{
    try{
        const allPokemon = await Pokemon.find();
        res.json(allPokemon);

    }catch(e){
        next(e);
    }
};
