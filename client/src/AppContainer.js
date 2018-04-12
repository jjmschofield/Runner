import { connect } from 'react-redux';
import { App } from './App';
import { fetchUserById } from './store/users/actions/fetchUser';
import { fetchRunsByUserId } from './store/runs/actions/fetchRuns';

const mapStateToProps = (state) => {
  return {
    users: state.users,
    runs: state.runs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserById: (userId) => {
      return dispatch(fetchUserById(userId));
    },
    fetchRunsByUserId: (userId) => {
      return dispatch(fetchRunsByUserId(userId));
    }
  };
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
