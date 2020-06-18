import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('app-root .title-link')).getText() as Promise<string>;
  }

  getAllMoviesButton(): Promise<string> {
    return element(by.id('all-movies-button')).getText() as Promise<string>;
  }

  theAllMoviesButton() {
    return element(by.id('all-movies-button'));
  }

  getTheSearchInput() {
    return element(by.id('search-input'));
  }
}
