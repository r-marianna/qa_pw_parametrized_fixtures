import { expect, testStep } from '../../common/pwHelpers/pw';

export class HomePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.yourFeedTab = page.getByText('Your Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.articleTitle = page.getByRole('heading', { level: 1 });
    this.navigation = page.getByRole('navigation');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Home' page`, async () => {
      await this.page.goto('/');
    });
  }

  authorLinkInArticleHeader(username) {
    return this.page.getByRole('link', { name: username }).first();
  }

  async clickNewArticleLink() {
    await this.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }

  async clickYourFeedTab() {
    await this.step(`Click on the Your feed tab`, async () => {
      await this.yourFeedTab.click();
    });
  }

  async assertYourFeedTabIsVisible() {
    await this.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }


  async assertArticleInFeedTabIsVisible(title) {
    await this.step(`Assert an article is visible`,
      async () => {
        await expect(this.articleTitle.filter(
          { hasText: title }
        )).toBeVisible();
      });
  }

  async assertArticleAuthorNameIsVisible(username) {
    await this.step(`Assert the article has correct author username`,
      async () => {
        await expect(this.authorLinkInArticleHeader(username)).toBeVisible();
      });
  }

  async assertUsernameIsVisible(username) {
    await this.step(`Assert the logged in username`,
      async () => {
        await expect(this.navigation.filter(
          { hasText: username }
        )).toBeVisible();
      });
  }

  async assertArticleInFeedTabIsNotVisible(title) {
    await this.step(`Assert an article is not visible`,
      async () => {
        await expect(this.articleTitle.filter(
          { hasText: title }
        )).toBeHidden();
      });
  }

  async assertArticleAuthorNameIsNotVisible(username) {
    await this.step(`Assert the article doesn't have correct author username`,
      async () => {
        await expect(this.authorLinkInArticleHeader(username)).toBeHidden();
      });
  }
}
