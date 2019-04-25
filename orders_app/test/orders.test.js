const assert = require("assert");
const supertest = require("supertest");
const mongoose = require("mongoose");
const {ORDER_STATUSES} = require("../constants/statuses");

const app = require("../index");

const Order = mongoose.model("Order");

function setUp(data = {}) {
  return Order.create(data);
}

function tearDown() {
  return Order.deleteMany();
}

function closeConnections() {
  mongoose.connection.close(() => {
    process.exit(0);
  });
}

describe("Orders", () => {
  const superapp = supertest(app);

  describe("POST /v1/orders", () => {
    it("should create order", () => {
      return superapp
        .post("/v1/orders")
        .type("application/json;charset=utf-8")
        .send({})
        // .expect(200)
        .then(({body}) => {
          console.debug("body", body);
          assert.strictEqual(body.status, ORDER_STATUSES.created);
        });
    });

    after(tearDown);
  });

  describe("GET /v1/orders/:_id", () => {
    let testModel;
    beforeEach(() =>
      setUp({status: ORDER_STATUSES.created})
        .then(model => {
          testModel = model;
        }),
    );

    it("should", () => {
      return superapp
        .get(`/v1/orders/${testModel._id}`)
        .expect(200)
        .then(({body}) => {
          // console.debug("body", body);
          assert.strictEqual(body.status, ORDER_STATUSES.created);
        });
    });

    after(tearDown);
  });

  describe("PUT /v1/orders/:_id", () => {
    describe("status = created", () => {
      let testModel;
      beforeEach(() =>
        setUp({status: ORDER_STATUSES.created})
          .then(model => {
            testModel = model;
          }),
      );

      it("should set `confirmed`", () => {
        return superapp
          .put(`/v1/orders/${testModel._id}`)
          .type("application/json;charset=utf-8")
          .send({
            status: ORDER_STATUSES.confirmed,
          })
          .expect(200)
          .then(({body}) => {
            // console.debug("body", body);
            assert.strictEqual(body.status, "confirmed");
          });
      });

      it("should set `cancelled`", () => {
        return superapp
          .put(`/v1/orders/${testModel._id}`)
          .type("application/json;charset=utf-8")
          .send({
            status: ORDER_STATUSES.cancelled,
          })
          .expect(200)
          .then(({body}) => {
            // console.debug("body", body);
            assert.strictEqual(body.status, "cancelled");
          });
      });

      it("should not set delivered", () => {
        return superapp
          .put(`/v1/orders/${testModel._id}`)
          .type("application/json;charset=utf-8")
          .send({
            status: ORDER_STATUSES.delivered,
          })
          .expect(400)
          .then(({body}) => {
            // console.debug("body", body);
            assert.strictEqual(body.errors.length, 1);
            assert.strictEqual(body.errors[0].message, "invalid-param", "message");
            assert.strictEqual(body.errors[0].reason, "wrong-status", "reason");
            assert.strictEqual(body.errors[0].name, "status", "name");
          });
      });

      after(tearDown);
    });

    describe("status = confirmed", () => {
      let testModel;
      beforeEach(() =>
        setUp({status: ORDER_STATUSES.confirmed})
          .then(model => {
            testModel = model;
          }),
      );

      it("should not set `created`", () => {
        return superapp
          .put(`/v1/orders/${testModel._id}`)
          .type("application/json;charset=utf-8")
          .send({
            status: ORDER_STATUSES.created,
          })
          .expect(400)
          .then(({body}) => {
            // console.debug("body", body);
            assert.strictEqual(body.errors.length, 1);
            assert.strictEqual(body.errors[0].message, "invalid-param", "message");
            assert.strictEqual(body.errors[0].reason, "wrong-status", "reason");
            assert.strictEqual(body.errors[0].name, "status", "name");
          });
      });

      it("should set `cancelled`", () => {
        return superapp
          .put(`/v1/orders/${testModel._id}`)
          .type("application/json;charset=utf-8")
          .send({
            status: ORDER_STATUSES.cancelled,
          })
          .expect(200)
          .then(({body}) => {
            // console.debug("body", body);
            assert.strictEqual(body.status, "cancelled");
          });
      });

      it("should set delivered", () => {
        return superapp
          .put(`/v1/orders/${testModel._id}`)
          .type("application/json;charset=utf-8")
          .send({
            status: ORDER_STATUSES.delivered,
          })
          .expect(200)
          .then(({body}) => {
            // console.debug("body", body);
            assert.strictEqual(body.status, "delivered");
          });
      });

      after(tearDown);
    });

    describe("status = cancelled", () => {
      let testModel;
      beforeEach(() =>
        setUp({status: ORDER_STATUSES.cancelled})
          .then(model => {
            testModel = model;
          }),
      );

      it("should not set `created`", () => {
        return superapp
          .put(`/v1/orders/${testModel._id}`)
          .type("application/json;charset=utf-8")
          .send({
            status: ORDER_STATUSES.created,
          })
          .expect(400)
          .then(({body}) => {
            // console.debug("body", body);
            assert.strictEqual(body.errors.length, 1);
            assert.strictEqual(body.errors[0].message, "invalid-param", "message");
            assert.strictEqual(body.errors[0].reason, "wrong-status", "reason");
            assert.strictEqual(body.errors[0].name, "status", "name");
          });
      });

      it("should not set `confirmed`", () => {
        return superapp
          .put(`/v1/orders/${testModel._id}`)
          .type("application/json;charset=utf-8")
          .send({
            status: ORDER_STATUSES.confirmed,
          })
          .expect(400)
          .then(({body}) => {
            // console.debug("body", body);
            assert.strictEqual(body.errors.length, 1);
            assert.strictEqual(body.errors[0].message, "invalid-param", "message");
            assert.strictEqual(body.errors[0].reason, "wrong-status", "reason");
            assert.strictEqual(body.errors[0].name, "status", "name");
          });
      });

      it("should not set `delivered`", () => {
        return superapp
          .put(`/v1/orders/${testModel._id}`)
          .type("application/json;charset=utf-8")
          .send({
            status: ORDER_STATUSES.delivered,
          })
          .expect(400)
          .then(({body}) => {
            // console.debug("body", body);
            assert.strictEqual(body.errors.length, 1);
            assert.strictEqual(body.errors[0].message, "invalid-param", "message");
            assert.strictEqual(body.errors[0].reason, "wrong-status", "reason");
            assert.strictEqual(body.errors[0].name, "status", "name");
          });
      });

      after(tearDown);
    });

    describe("status = delivered", () => {
      let testModel;
      beforeEach(() =>
        setUp({status: ORDER_STATUSES.delivered})
          .then(model => {
            testModel = model;
          }),
      );

      it("should not set `created`", () => {
        return superapp
          .put(`/v1/orders/${testModel._id}`)
          .type("application/json;charset=utf-8")
          .send({
            status: ORDER_STATUSES.created,
          })
          .expect(400)
          .then(({body}) => {
            // console.debug("body", body);
            assert.strictEqual(body.errors.length, 1);
            assert.strictEqual(body.errors[0].message, "invalid-param", "message");
            assert.strictEqual(body.errors[0].reason, "wrong-status", "reason");
            assert.strictEqual(body.errors[0].name, "status", "name");
          });
      });

      it("should not set `confirmed`", () => {
        return superapp
          .put(`/v1/orders/${testModel._id}`)
          .type("application/json;charset=utf-8")
          .send({
            status: ORDER_STATUSES.confirmed,
          })
          .expect(400)
          .then(({body}) => {
            // console.debug("body", body);
            assert.strictEqual(body.errors.length, 1);
            assert.strictEqual(body.errors[0].message, "invalid-param", "message");
            assert.strictEqual(body.errors[0].reason, "wrong-status", "reason");
            assert.strictEqual(body.errors[0].name, "status", "name");
          });
      });

      it("should not set `cancelled`", () => {
        return superapp
          .put(`/v1/orders/${testModel._id}`)
          .type("application/json;charset=utf-8")
          .send({
            status: ORDER_STATUSES.cancelled,
          })
          .expect(400)
          .then(({body}) => {
            // console.debug("body", body);
            assert.strictEqual(body.errors.length, 1);
            assert.strictEqual(body.errors[0].message, "invalid-param", "message");
            assert.strictEqual(body.errors[0].reason, "wrong-status", "reason");
            assert.strictEqual(body.errors[0].name, "status", "name");
          });
      });

      after(tearDown);
    });
  });

  after(closeConnections);
});
