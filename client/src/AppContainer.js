import { connect } from 'react-redux';
import { App } from './App';
import { fetchUserById } from './store/users/actions/fetchUser';

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserById: (userId) => {
      return dispatch(fetchUserById(userId));
    },
  };
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
