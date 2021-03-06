require('../../src/directives/hyper-yield');

describe('hyper-yield tag', function() {
  var $compile,
      $rootScope,
      HYPER_CONTENT_FOR_IDS;

  beforeEach(angular.mock.module('hyperContentFor'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _HYPER_CONTENT_FOR_IDS_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    HYPER_CONTENT_FOR_IDS = _HYPER_CONTENT_FOR_IDS_;
  }));

  it('wraps the content matching the correct ID in HYPER_CONTENT_FOR_IDS', function() {
    HYPER_CONTENT_FOR_IDS['header'] = '<h2>Sub-header in yield</h2>'
    var yieldElement = $compile('<hyper-yield to="header"></hyper-yield>')($rootScope);

    $rootScope.$digest();

    expect(yieldElement.html()).toContain('<h2>Sub-header in yield</h2>');
  });

  it('transcludes the content if the from value is not present in HYPER_CONTENT_FOR_IDS', function() {
    delete HYPER_CONTENT_FOR_IDS['header'];;

    var yieldElement = $compile('<hyper-yield to="header"><h2>Sample content</h2></hyper-yield>')($rootScope);

    $rootScope.$digest();

    expect(yieldElement.html()).toContain('<h2>Sample content</h2>');
  });
});
