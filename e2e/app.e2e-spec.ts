import { GstCalculatorPage } from './app.po';

describe('gst-calculator App', function() {
  let page: GstCalculatorPage;

  beforeEach(() => {
    page = new GstCalculatorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
