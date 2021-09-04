$(".basicAutoSelect").autoComplete({
  resolver: "custom",
  events: {
    search: function (qry, callback) {
      resArray = practiceODSCode.filter(function (el) {
        return el.text.toLowerCase().includes(qry.toLowerCase());
      });
      callback(resArray);
    },
  },
});
