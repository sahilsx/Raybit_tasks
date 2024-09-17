const mongoose = require("mongoose")


const create = mongoose.model("create",{
  title: { type: String,  },
  body : { type: String,  },
 description: { type: String, },



}
)


module.exports = create;