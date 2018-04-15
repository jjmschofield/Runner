import { connect } from 'react-redux';
import { App } from './App';
import { fetchUserById } from './store/users/actions/fetchUser';
import { fetchRunsByUserId } from './store/runs/actions/fetchRuns';
import { addRun } from './store/runs/actions/addRun';

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
    },
    addRun: ({userId, distance, duration, date}) => {
      return dispatch(addRun({userId, distance, duration, date}));
    }
  };
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
