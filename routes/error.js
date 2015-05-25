// Universal error handler
module.exports = function err(err, res) {
  res.status(500);
  res.json({'error': 1, 'message': err.message});
}