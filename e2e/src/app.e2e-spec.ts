import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display app title', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('myMovieshop');
  });

  it('should display the text inside the All Movies button', () => {
    page.navigateTo;
    expect(page.getAllMoviesButton()).toEqual('All Movies');
  });

  it('should redirect to products url', () => {
    page.navigateTo;
    page.theAllMoviesButton().click();

    expect(browser.getCurrentUrl()).toContain('/products');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });
});
