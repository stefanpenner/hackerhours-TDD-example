App.setupForTesting();

module("acceptance", {
  setup: function(){
    App.reset();
    App.injectTestHelpers();
  }
});

test("namespace existence", function(){
  ok(App, 'namespace was loaded');
});

test("bloggr", function(){
  find('#title');
  equal($('#title').text(), 'Bloggr');
});

test("navigate to the posts page", function(){
  visit('/posts').then(function(){
    find('#post-title');
    equal($('.post').length, 2, 'there should be 2 posts');
  });
});

test("create a new post", function(){
  visit('/posts/new').then(function(){
    find('#post-create');

    return fillIn('[name=title]', 'OMG TITLE').then(function(){
      equal($('[name=title]').val(), 'OMG TITLE');

      return click('#save-post');
    });

  }).then(function(){
    return visit('/posts').then(function(){
      equal($('.post').length, 3, 'there should now be 3 posts');
    });
  });
});

