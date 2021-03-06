import {
  linkify
} from 'ember-linkify/helpers/linkify';
import { module, test } from 'qunit';

module('Unit | Helper | linkify');

test('it should turn a url into a link', function(assert) {
  var result = linkify(['My link: http://google.com']).toString().trim();
  assert.equal(result, 'My link: <a href="http://google.com" target="_self">http://google.com</a>');
});

test('it should turn a ip address into a link', function(assert) {
  var result = linkify(['My link: https://62.123.123.123/test and some more text']).toString().trim();
  assert.equal(result, 'My link: <a href="https://62.123.123.123/test" target="_self">https://62.123.123.123/test</a> and some more text');
});

test('it should turn a url with www. into a link', function(assert) {
  var result = linkify(['www.johnotander.com']).toString().trim();
  assert.equal(result, '<a href="//www.johnotander.com" target="_self">www.johnotander.com</a>');
});

test('it should escape html', function(assert) {
  var result = linkify(['<h1>Some Html</h1>']).toString().trim();
  assert.equal(result, '&lt;h1&gt;Some Html&lt;/h1&gt;');
});

test('it should not allow script tags because bad', function(assert) {
  var result = linkify(['<script>alert("oh noes!");</script>']).toString().trim();
  assert.equal(result, '&lt;script&gt;alert(&quot;oh noes!&quot;);&lt;/script&gt;');
});

test('it should not link other attempted bad urls', function(assert) {
  var result = linkify(['http://javascript:alert(1)']).toString().trim();
  assert.equal(result, 'http://javascript:alert(1)');
});

test('it should turn a url into a link with a target of "_blank"', function(assert) {
  var result = linkify(["My link: http://google.com", "_blank"]).toString().trim();
  assert.equal(result, 'My link: <a href="http://google.com" target="_blank">http://google.com</a>');
});

test('it should shorten a url by specified url length and adds 3 dots to the end', function(assert) {
  var options = {
    urlLength : 10
  };
  var result = linkify(["http://emberjs.com/", "_blank"] , options ).toString().trim();
  assert.equal(result , '<a href="http://emberjs.com/" target="_blank">http://emb...</a>' );
});

test('it should turn a url into a link with a rel of "noopener"', function(assert) {
  var options = {
    rel : 'noopener'
  };
  var result = linkify(["http://emberjs.com/", "_blank"] , options ).toString().trim();
  assert.equal(result , '<a href="http://emberjs.com/" target="_blank" rel="noopener">http://emberjs.com/</a>' );
});

test('it should turn a url into a link with a class of "amilkey"', function(assert) {
  var options = {
    class : 'amilkey'
  };
  var result = linkify(["http://emberjs.com/", "_blank"] , options ).toString().trim();
  assert.equal(result , '<a href="http://emberjs.com/" target="_blank" class="amilkey">http://emberjs.com/</a>' );
});

test('it should turn a url into a link with a class of "amilkey" and a rel of "noopener""', function(assert) {
  var options = {
    rel   : 'noopener',
    class : 'amilkey'
  };
  var result = linkify(["http://emberjs.com/", "_blank"] , options ).toString().trim();
  assert.equal(result , '<a href="http://emberjs.com/" target="_blank" rel="noopener" class="amilkey">http://emberjs.com/</a>' );
});
