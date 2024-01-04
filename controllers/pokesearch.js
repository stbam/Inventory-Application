const Pokemon = require("../models/pokemon");

exports.create_pokemon_post = async (req, res, next) => {
  const { name, type, height, forms, weight, imageUrl } = req.body;

  try {
    const pokemon = new Pokemon({
      name: name,
      type: type,
      height: height,
      weight: weight,
      forms: forms,
      imageUrl: imageUrl,
    });

    // console.log(pokemon._id); // Access the _id field
    await pokemon.save();
    // res.send("Pokemon created successfully"); //cant do this with res.redirect one signal per send
    res.redirect("/search/list");
  } catch (err) {
    next(err);
  }
};
exports.pokemon_list = async (req, res, next) => {
  try {
    const allPokemon = await Pokemon.find();

    // res.json(allPokemon);

    res.render("pokedex", { pokemonList: allPokemon }); //renders the list in pokedex.ejs
  } catch (e) {
    next(e);
  }
};

exports.pokemon_delete = async (req, res, next) => {
  try {
    const delete_pokemon = await Pokemon.findOneAndDelete({
      name: req.body.name,
    });
    if (!delete_pokemon) {
      return res.status(404).send("Pokemon not found");
    }
    // res.send("Pokemon deleted successfully");
    res.redirect("/search/list");
  } catch (err) {
    next(err);
  }
};
exports.single_pokemon = async (req, res, next) => {
  try {
    const get_pokemon = await Pokemon.aggregate([{ $sample: { size: 1 } }]);

    // res.render("pokedex",{ pokemonList: allPokemon}) //renders the list in pokedex.ejs

    console.log(get_pokemon[0].imageUrl);
    res.render("singlePokemon", {
      name: get_pokemon[0].name,
      type: get_pokemon[0].type,
      height: get_pokemon[0].height,
      forms: get_pokemon[0].forms,
      imageUrl: get_pokemon[0].imageUrl,
      _id: get_pokemon[0]._id,
    });
    /*
  name: name,
            type: type,
            height: height,
            weight: weight,
            forms: forms,
            imageUrl:imageUrl,
*/

    /*if (random_pokemon.length === 0) {
            return res.status(404).send("No Pokemon found");
        }*/
  } catch (err) {
    next(err);
  }
};

/*exports.update_pokemon = async(req,res,next)=>{
    try{
        const updatePokemon= await Pokemon.updateOne({name:name},{
            $set: {
                type: type,
                height: height,
                forms: forms,
                weight: weight,
                imageUrl: imageUrl,
            },
        })

    }catch(e){
        console.log(e)
    }
    console.log("bob");
    res.redirect('/search/individualPokemon');

}*/
exports.update_pokemon = async (req, res, next) => {
  try {
    const { name, type, height, forms, weight, imageUrl, _id } = req.body;
    console.log(name);
    const updatePokemon = await Pokemon.updateOne(
      { _id },
      {
        name: name,
        type: type,
        height: height,
        forms: forms,
        weight: weight,
        imageUrl: imageUrl,
      },
    );
    //   console.log(myPokemon._id); // Access the _id field
    // console.log(updatePokemon);

    if (updatePokemon.nModified === 0) {
      return res.status(404).send("Pokemon not found");
    }
    console.log("Update successful");
    res.redirect("/search/individualPokemon");
  } catch (e) {
    console.log(e);
    next(e);
  }
};
