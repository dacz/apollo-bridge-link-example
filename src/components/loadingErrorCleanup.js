import { branch, compose, mapProps, renderComponent } from 'recompose';
import { omit, prop } from 'ramda';

import ErrorComponent from './Error';
import Loading from './Loading';

const withLoading = branch(prop('loading'), renderComponent(Loading));

const withError = branch(prop('error'), renderComponent(ErrorComponent));

const cleanUp = mapProps(omit(['loading', 'error']));

export default compose(withLoading, withError, cleanUp);
