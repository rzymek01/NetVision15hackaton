/**
 * Created by maciek on 17.04.15.
 */

var app = app || {};
app.params = {};

function tokenize(arr) {
  var minLength = 3;
  return arr.split(' ').filter(function(a) { return a.length >= minLength; })
}

function searchKeyword(src, dst) {
  var srcP = tokenize(src),
      dstP = tokenize(dst);

  for (var i = 0, l = srcP.length; i < l; ++i) {
    var item = srcP[i];
    if (-1 !== dstP.indexOf(item)) {
      return item;
    }
  }

  return '';
}

function fail(status) {
  console.debug( status + ", you fail this time" );
}

function success3(data, points) {
  console.debug('#3 ', data, JSON.stringify(data) + ", things are going well");

  $('#stage3').text('Punkty: ' + points);
}

function success2b(data, params) {
  console.debug('2b ', data, JSON.stringify(data) + ", things are going well" );

  var transl = data.data && data.data.translations && data.data.translations[0];

  app.params.phrase2 = transl.translatedText;
  var keyword = searchKeyword(app.params.phrase, app.params.phrase2);
  console.debug('key:', keyword);
  params.keyword = keyword;

  var stage = new app.ThirdStage();
  $.when( stage.run(params) ).then(success3, fail);

  $('#stage2b').text('keyword: ' + keyword);
}

function success2(data) {
  console.debug('2a ', data, JSON.stringify(data) + ", things are going well" );

  var transl = data.data && data.data.translations && data.data.translations[0];

  app.params.phrase2 = transl.translatedText;
 // var keyword = searchKeyword(app.params.phrase, app.params.phrase2);
 // console.debug('key:', keyword);

  var paramsForNextStage = {
    detectedSourceLanguage: transl.detectedSourceLanguage,
    translatedText: transl.translatedText,
//    keyword: keyword,
    hash: app.params.hash
  };

  var params = {
    q: transl.translatedText,
    lang: ('pl' == app.params.lang ? 'en' : 'pl')
  };

  var stage = new app.SecondStage();
  $.when( stage.run(params, paramsForNextStage) ).then(success2b, fail);

  $('#stage2').text(JSON.stringify(data));
}

function success1(data) {
  console.debug( data, JSON.stringify(data) + ", things are going well" );

  var params = {
    q: data.phrase,
    lang: data.targetLanguage
  };
  app.params.hash = data.hash;
  app.params.phrase = data.phrase;
  app.params.lang = data.targetLanguage;

  var stage = new app.SecondStage();
  $.when( stage.run(params) ).then(success2, fail);

  $('#stage1').text(JSON.stringify(data));
};


$(function () {
  console.debug('app init');

  var firstStage = new app.FirstStage();
  $.when( firstStage.run() ).then(success1, fail);
});
