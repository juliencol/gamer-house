import renderer from 'react-test-renderer';
import Authentication from '../pages/authentication/Authentication';

it('should render the login page correctly by default', () => {
  const tree = renderer.create(<Authentication setAuthentication={() => ''} />).toJSON();
  expect(tree).toMatchSnapshot();
});
