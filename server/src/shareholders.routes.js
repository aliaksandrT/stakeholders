const express = require('express');

function createRouter(db) {
  const router = express.Router();

  router.post('/shareholder', (req, res, next) => {
    db.query(
      'INSERT INTO shareholdersTable (name, stocksCount, stocksType) VALUES (?,?,?)',
      [req.body.name, req.body.stocksCount, req.body.stocksType],
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

  router.post('/splitshares', (req, res, next) => {
    db.query(
      'UPDATE shareholdersTable SET stocksCount=stocksCount*?',
      [req.body.multiplier],
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

  router.put('/shareholder/:id', function (req, res, next) {
    db.query(
      'UPDATE shareholdersTable SET name=?, stocksCount=?, stocksType=? WHERE id=?',
      [req.body.name, req.body.stocksCount, req.body.stocksType, req.params.id],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  router.delete('/shareholder/:id', function (req, res, next) {
    db.query(
      'DELETE FROM shareholdersTable WHERE id=?',
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

  router.get('/shareholders', function (req, res, next) {
    db.query(
      'SELECT id, name, stocksCount, stocksType FROM shareholdersTable LIMIT 10 OFFSET ?',
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