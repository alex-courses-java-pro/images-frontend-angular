import { ImgazPage } from './app.po';

describe('imgaz App', () => {
  let page: ImgazPage;

  beforeEach(() => {
    page = new ImgazPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
