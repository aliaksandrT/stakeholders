const express = require('express');

function createRouter(db) {
  const router = express.Router();

  router.post('/sholder', (req, res, next) => {
    db.query(
      'INSERT INTO stakeholders (name, stockscount, stockstype) VALUES (?,?,?)',
      [req.body.name, req.body.stockscount, req.body.stockstype],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  router.put('/sholder/:id', function (req, res, next) {
    db.query(
      'UPDATE stakeholders SET name=?, stockscount=?, stockstype=? WHERE id=?',
      [req.body.name, req.body.stockscount, req.body.stockstype, req.params.id],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  router.delete('/sholder/:id', function (req, res, next) {
    db.query(
      'DELETE FROM stakeholders WHERE id=?',
      [req.params.id],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  router.get('/sholders', function (req, res, next) {
    db.query(
      'SELECT id, name, stockscount, stockstype FROM stakeholders LIMIT 10 OFFSET ?',
      [10*(req.params.page || 0)],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  return router;
}

module.exports = createRouter;