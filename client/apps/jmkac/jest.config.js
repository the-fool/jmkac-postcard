module.exports = {
  name: 'jmkac',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/jmkac/',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
