let path  = require('path');
let imageController=(req,res)=>{
  const parentDirectoryPath = path.join(__dirname, '..','/asserts/',req.params.name)
res.sendFile(parentDirectoryPath);
};
module.exports={imageController}