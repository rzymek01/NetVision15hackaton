/**
 * Created by maciek on 17.04.15.
 */

var app = app || {};
app.FirstStage = function() {
  console.debug('new FirstStage');

};
app.FirstStage.prototype.run = function() {
  console.debug('in FirstStage.run');

  var defer = $.Deferred();

  // ajax
  var req = $.ajax({
    url: 'http://netvision.mb-staging.com/api/phrase?start',
    method: 'GET',
    dataType: 'json',
    cache: false,
    crossDomain: true
  });

  req.done(function(data) {
    defer.resolve(data);
  });
  req.fail(function(xhr, status) {
    defer.reject(status);
  });
  //

  return defer.promise();
};
