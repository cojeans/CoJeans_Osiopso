/*
Copyright (c) 2019 Daybrush
name: order-map
license: MIT
author: Daybrush
repository: git+https://github.com/daybrush/order-map.git
version: 0.2.2
*/
'use strict';

/**
 *
 */
var OrderMap =
/*#__PURE__*/
function () {
  /**
   *
   */
  function OrderMap(separator) {
    this.separator = separator;
    this.orderMap = {};
  }
  /**
   *
   */


  var __proto = OrderMap.prototype;

  __proto.getFullName = function (names) {
    return names.join(this.separator);
  };
  /**
   *
   */


  __proto.get = function (names) {
    return this.orderMap[this.getFullName(names)];
  };
  /**
   *
   */


  __proto.gets = function (names, isFull) {
    if (isFull === void 0) {
      isFull = true;
    }

    var fullOrders = [];
    var self = this;

    function pushOrders(nextNames, stack) {
      var orders = self.get(nextNames);

      if (!orders) {
        return;
      }

      orders.forEach(function (name) {
        var nextStack = stack.concat([name]);
        var nextOrders = pushOrders(nextNames.concat([name]), nextStack);

        if (!nextOrders || !nextOrders.length) {
          fullOrders.push(stack.concat([name]));
        }
      });
      return orders;
    }

    pushOrders(names, isFull ? names : []);
    return fullOrders;
  };
  /**
   *
   */


  __proto.set = function (names, orders) {
    var _this = this;

    names.forEach(function (name, i) {
      _this.addName(names.slice(0, i), name);
    });
    this.orderMap[this.getFullName(names)] = orders;
    return orders;
  };
  /**
   *
   */


  __proto.add = function (names) {
    var length = names.length;

    if (!length) {
      return [];
    }

    return this.addName(names.slice(0, -1), names[length - 1]);
  };
  /**
   *
   */


  __proto.addName = function (names, name) {
    var orders = this.get(names) || this.set(names, []);

    if (orders.indexOf(name) === -1) {
      orders.push(name);
    }

    return orders;
  };
  /**
   *
   */


  __proto.findIndex = function (names, orderName) {
    var orders = this.orderMap[this.getFullName(names)];

    if (!orders) {
      return -1;
    }

    return orders.indexOf(orderName);
  };
  /**
   *
   */


  __proto.remove = function (names) {
    var fullName = this.getFullName(names);
    var orderMap = this.orderMap;

    for (var name in orderMap) {
      if (name.indexOf(fullName) === 0) {
        delete orderMap[name];
      }
    }

    var length = names.length;

    if (length) {
      var prevNames = names.slice(0, -1);
      var lastName = names[length - 1];
      this.splice(prevNames, this.findIndex(prevNames, lastName), 1);
    }

    return this;
  };
  /**
   *
   */


  __proto.filter = function (names, callback, isFull) {
    if (isFull === void 0) {
      isFull = true;
    }

    var result = this.gets(names, isFull).filter(callback);
    var map = new OrderMap(this.separator);
    var stack = isFull ? [] : names;
    result.forEach(function (nextNames) {
      map.add(stack.concat(nextNames));
    });
    return map;
  };
  /**
   *
   */


  __proto.splice = function (names, index, deleteCount) {
    var orders = [];

    for (var _i = 3; _i < arguments.length; _i++) {
      orders[_i - 3] = arguments[_i];
    }

    var currentOrders = this.get(names) || this.set(names, []);
    currentOrders.splice.apply(currentOrders, [index, deleteCount].concat(orders));
    return this;
  };
  /**
   *
   */


  __proto.clear = function () {
    this.orderMap = {};
  };
  /**
   *
   */


  __proto.setObject = function (obj) {
    var orderMap = this.orderMap;

    for (var name in obj) {
      orderMap[name] = obj[name].slice();
    }
  };
  /**
   *
   */


  __proto.getObject = function () {
    var nextMap = {};
    var orderMap = this.orderMap;

    for (var name in orderMap) {
      nextMap[name] = orderMap[name].slice();
    }

    return nextMap;
  };
  /**
   *
   */


  __proto.clone = function () {
    var map = new OrderMap(this.separator);
    map.setObject(map.orderMap);
    return map;
  };

  return OrderMap;
}();

module.exports = OrderMap;
//# sourceMappingURL=order-map.cjs.js.map
