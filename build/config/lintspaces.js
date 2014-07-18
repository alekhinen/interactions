module.exports = {
  all: {
    src: [
      'Gruntfile.js',
      'public/javascripts/**/*',
      'public/stylesheets/SASS/**/*'
    ],
    options: {
      newline: true,
      trailingspaces: true,
      indentation: 'spaces',
      spaces: 2,
      ignores: ['js-comments']
    }
  }
};
