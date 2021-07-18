        return i;
      })
      .join("&");

    return {
      resourceId: resourceId,
      callback: callback,
      query: params ? "?" + params : ""
    };
  };

  var createApiMethod = function(path) {
    return function() {
      var args = processArguments.apply(null, arguments);
      get(path + args.query, args.callback);
    };
  };

  var api = {
    setToken: function(token) {
      if (!token) {
        throw new Error("jribbble.setToken() expects a valid access_token");
      }
      accessToken = token;
    },
    shots: function() {
      var args = processArguments.apply(null, arguments);
      var path = args.resourceId ? "shots/" + args.resourceId : "user/shots";
      get(path + args.query, args.callback);
    },
    user: createApiMethod("user"),
    projects: createApiMethod("user/projects"),
    likes: createApiMethod("user/likes"),
    popular: createApiMethod("popular_shots")
  };

  // These are internal methods not needed in browser contexts. Only include
  // them in the public api in node-looking context for testing purposes.
  try {
    if (module) {
      api._createApiMethod = createApiMethod;
      api._processArguments = processArguments;
    }
  } catch(e) {};

  return api;
})();

if (window) {
  window.jribbble = jribbble;
}

try {
  if (module) {
    module.exports = jribbble;
  }
} catch(e) {};
