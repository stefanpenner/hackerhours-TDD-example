App = Ember.Application.create({
  LOG_ACTIVE_GENERATION: true
});

App.Router.map(function() {
  this.resource('posts', function(){
    this.route('new');
  });
});

Ember.Application.initializer({
  name: 'models', 
  initialize: function(container, app){
    app.register('model:post', Ember.Object.extend());
  }
});

App.PostsNewController = Ember.ObjectController.extend({
  needs: ['posts'],
  save: function(){
    var posts = this.get('controllers.posts'),
    post = this.get('model'),
    Post = this.container.resolve('model:post');

    posts.pushObject(post);
    this.set('model', Post.create());
  }
});

App.PostsNewRoute = Ember.Route.extend({
  model: function(){
    var Post = this.container.resolve('model:post');

    return Post.create();
  }
});

App.POSTS_FIXTURE = [
  'red', 'yelllow'
];

App.PostsRoute = Ember.Route.extend({
  model: function() {
    return App.POSTS_FIXTURE;
  }
});
