/**
 * Created by maciek on 17.04.15.
 */

var app = app || {};
app.SecondStage = function() {
  console.debug('new SecondStage');

};
app.SecondStage.prototype.run = function(params, params2) {
  console.debug('in SecondStage.run');

  var defer = $.Deferred();

  // ajax
  var req = $.ajax({
    url: 'https://www.googleapis.com/language/translate/v2',
    method: 'GET',
    dataType: 'jsonp',
    data: {
      q: params.q,
      target: params.lang,
      key: 'AIzaSyBQpidcUU6dx9j0WTKxWxC17-pmT0kNzC0'
    },
    cache: false,
    crossDomain: true
  });

  req.done(function(data) {
    defer.resolve(data, params2);
  });
  req.fail(function(xhr, status) {
    defer.reject(status);
  });
  //

  return defer.promise();
};
