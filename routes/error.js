// Universal error handler
module.exports = function err(err, res) {
  res.json({'error': 1, 'message': err});
}