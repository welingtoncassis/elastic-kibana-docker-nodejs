const express = require("express");

const router = express.Router();

const elastic = require("elasticsearch");

const bodyParser = require("body-parser").json();

const elasticClient = elastic.Client({
  host: "localhost:9200",
});

/**
 * Adicionar os parâmetros dessa chamada
 * ao índice que chamamos de logs em elasticsearch.
 */
router.use((req, res, next) => {
  elasticClient
    .index({
      index: "logs",
      body: {
        url: req.url,
        method: req.method,
      },
    })
    .then((res) => {
      console.log("Logs indexed");
    })
    .catch((err) => {
      console.log(err);
    });

  next();
});

router.post("/products", bodyParser, (req, res) => {
  elasticClient
    .index({
      index: "products",
      body: req.body,
    })
    .then((resp) => {
      return res.status(200).json({
        msg: "Product indexed",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        msg: "ERROR",
      });
    });
});

router.get("/products/:id", bodyParser, (req, res) => {
  let query = {
    index: "products",
    id: req.params.id,
  };
  elasticClient
    .get(query)
    .then((resp) => {
      if (!resp) {
        return res.status(404).json({
          product: resp,
        });
      }
      return res.status(200).json({
        product: resp,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        msg: "ERROR not found",
        err,
      });
    });
});

router.put("/products/:id", bodyParser, (req, res) => {
  elasticClient
    .update({
      index: "products",
      id: req.params.id,
      body: {
        doc: req.body,
      },
    })
    .then((resp) => {
      return res.status(200).json({
        msg: "Updated",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        msg: "ERROR",
        err,
      });
    });
});

router.delete("/products/:id", bodyParser, (req, res) => {
  elasticClient
    .delete({
      index: "products",
      id: req.params.id,
    })
    .then((resp) => {
      return res.status(200).json({
        msg: "Deleted",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        msg: "ERROR",
        err,
      });
    });
});

router.get("/products", bodyParser, (req, res) => {
  let query = {
    index: "products",
  };
  if (req.query.product) query.q = `*${req.query.product}*`;
  elasticClient
    .search(query)
    .then((resp) => {
      return res.status(200).json({
        products: resp.hits.hits,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        msg: "ERROR not found",
        err,
      });
    });
});

module.exports = router;
