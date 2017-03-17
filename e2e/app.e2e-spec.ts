import { MinetFileUploaderPage } from './app.po';

describe('minet-file-uploader App', function() {
  let page: MinetFileUploaderPage;

  beforeEach(() => {
    page = new MinetFileUploaderPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
