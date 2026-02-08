import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';

test.use({ contextsNumber: 3, usersNumber: 3 });

test.beforeEach(async ({
  pages, users, articleWithoutTags, articleWithOneTag
}) => {
  await signUpUser(pages[0], users[0], 1);
  await signUpUser(pages[1], users[1], 2);
  await signUpUser(pages[2], users[2], 3);
  await createArticle(pages[0], articleWithoutTags, 1);
  await createArticle(pages[1], articleWithOneTag, 2);
});

test('Can see in your feeds articles from two different users', async ({
  articleWithoutTags,
  articleWithOneTag,
  pages,
  users,
}) => {
  const viewArticlePage = new ViewArticlePage(pages[2], 1);

  await viewArticlePage.open(articleWithoutTags.url);

  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
  await viewArticlePage.assertArticleAuthorNameIsVisible(users[0].username);
  await viewArticlePage.clickFollowBtn();

  const viewArticlePage2 = new ViewArticlePage(pages[2], 2);
  await viewArticlePage2.open(articleWithOneTag.url);

  await viewArticlePage2.assertArticleTitleIsVisible(articleWithOneTag.title);
  await viewArticlePage2.assertArticleTextIsVisible(articleWithOneTag.text);
  await viewArticlePage2.assertArticleAuthorNameIsVisible(users[1].username);
  await viewArticlePage2.clickFollowBtn();

  const homePage = new HomePage(pages[2], 3);
  await homePage.open();
  await homePage.clickYourFeedTab();
  await homePage.assertArticleAuthorNameIsVisible(users[0].username);
  await homePage.assertArticleInFeedTabIsVisible(articleWithoutTags.title);
  await homePage.assertArticleAuthorNameIsVisible(users[1].username);
  await homePage.assertArticleInFeedTabIsVisible(articleWithOneTag.title);
  await homePage.assertArticleAuthorNameIsVisible(users[2].username);
});
