const mongoose = require('mongoose');

const PokemonSchema = new mongoose.Schema({
    name: String,
    type: String,
    height: Number,
    weight: String,
    forms: String,
    imageUrl:String,
    
});

/*PokemonSchema.virtual("url").get(function () {
    return "/list";
  });*/

// Create a model based on the schema
const Pokemon = mongoose.model('Pokemon', PokemonSchema);

module.exports = Pokemon;
