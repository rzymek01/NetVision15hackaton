/**
 * Created by maciek on 17.04.15.
 */

var app = app || {};
app.ThirdStage = function() {
  console.debug('new ThirdStage');

};
app.ThirdStage.prototype.run = function(params) {
  console.debug('in ThirdStage.run', params);

  var defer = $.Deferred();

  // ajax
  var req = $.ajax({
    url: 'http://netvision.mb-staging.com/api/translation?start',
    method: 'POST',
    dataType: 'json',
    cache: false,
    crossDomain: true,
    data: {
      "detectedLanguage": params.detectedSourceLanguage,
      "translation": params.translatedText,
      "keyword": params.keyword,
      "hash": params.hash
    },
  });

  req.done(function(data, status, xhr) {
    defer.resolve(data, xhr.status);
  });
  req.fail(function(xhr, status) {
    defer.reject(status);
  });
  //

  return defer.promise();
};
