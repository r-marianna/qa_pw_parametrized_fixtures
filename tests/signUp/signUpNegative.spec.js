import { test } from '../_fixtures/fixtures';
import {
  EMPTY_USERNAME_MESSAGE,
  INVALID_EMAIL_MESSAGE,
  EMPTY_PASSWORD_MESSAGE,
} from '../../src/ui/constants/authErrorMessages';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';

const user = generateNewUserData();
const testParameters = [
  {
    email: user.email,
    username: '',
    password: user.password,
    message: EMPTY_USERNAME_MESSAGE,
    title: 'empty username'
  },
  {
    email: '',
    username: user.username,
    password: user.password,
    message: INVALID_EMAIL_MESSAGE,
    title: 'empty email'
  },
  {
    email: user.email,
    username: user.username,
    password: '',
    message: EMPTY_PASSWORD_MESSAGE,
    title: 'empty password'
  },
];

test.describe('Sign up negative tests', () => {
  testParameters.forEach(({ email, username, message, password, title }) => {
    test(`Sign up with ${title}`, async ({ signUpPage }) => {
      await signUpPage.open();
      await signUpPage.fillUsernameField(username);
      await signUpPage.fillEmailField(email);
      await signUpPage.fillPasswordField(password);
      await signUpPage.clickSignUpButton();

      await signUpPage.assertErrorMessageContainsText(message);
    });
  });
});