$("#orgLookupSearch").autoComplete({
  resolver: "custom",
  events: {
    search: function (qry, callback) {
      resArray = allODSCodes.filter(function (el) {
        return el.text.toLowerCase().includes(qry.toLowerCase());
      });
      callback(resArray);
    },
  },
});
console.log(ods);
if (ods != null) {
  $("#spinner-container").show();
  fetch(
    "https://storage.googleapis.com/opengpworkforcedata.appspot.com/organisations.json"
  )
    .then(function (resp) {
      resp.json().then(function (json) {
        $("#spinner-container").hide();
        $("#organisation-details").toggleClass("d-none");
        let orgDetails = json.find((o) => o.ODS === ods);
        console.log(orgDetails);
        $("#org-name").html(orgDetails["Name"]);
        $("#org-ods").html(orgDetails["ODS"]);
        $("#org-type").html(orgDetails["OrgType"]);
        $("#org-population").html(numberWithCommas(orgDetails["Population"]));

        if ("Parents" in orgDetails) {
          if ("PCN" in orgDetails["Parents"]) {
            $("#parent-pcn").toggleClass("d-none");
            $("#parent-pcn-name").html(
              lookupODSName(orgDetails["Parents"]["PCN"], json)
            );
          }
          if ("CCG" in orgDetails["Parents"]) {
            $("#parent-ccg").toggleClass("d-none");
            $("#parent-ccg-name").html(
              lookupODSName(orgDetails["Parents"]["CCG"], json)
            );
          }
          if ("ICS" in orgDetails["Parents"]) {
            $("#parent-ics").toggleClass("d-none");
            $("#parent-ics-name").html(
              lookupODSName(orgDetails["Parents"]["ICS"], json)
            );
          }
        }

        if ("Children" in orgDetails) {
          if ("PCNs" in orgDetails["Children"]) {
            $("#child-pcns").toggleClass("d-none");
            $("#child-pcn-names").html(
              generateListOfNames(orgDetails["Children"]["PCNs"], json)
            );
          }
          if ("Practices" in orgDetails["Children"]) {
            $("#child-practices").toggleClass("d-none");
            $("#child-practice-names").html(
              generateListOfNames(orgDetails["Children"]["Practices"], json)
            );
          }
          if ("CCGs" in orgDetails["Children"]) {
            $("#child-ccgs").toggleClass("d-none");
            $("#child-ccg-names").html(
              generateListOfNames(orgDetails["Children"]["CCGs"], json)
            );
          }
        }
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}

function lookupODSName(ods, json) {
  let orgDetails = json.find((o) => o.ODS === ods);
  return "<a href='?ods=" + ods + "'>" + orgDetails["Name"] + "</a>";
}

function generateListOfNames(list, json) {
  out = "";
  for (ods of list) {
    out = out + lookupODSName(ods, json) + "<br>";
  }
  return out;
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
