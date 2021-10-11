
// Import hooks from 'react'. Which hook is meant for causing side effects?
import { useEffect } from 'react';
// Import hooks from 'react-redux'
import { useSelector, useDispatch } from 'react-redux';

import styles from './QuestionsContainer.module.css'

// Import the thunk creator
import { getquestions } from '../../store/questions';
import { useParams } from 'react-router';



const UsersContainer = () => {
  // Declare variables from hooks
  const dispatch = useDispatch();
  const {questionId} = useParams()
  const users = useSelector(state => state.questions)

  // Use a 'react' hook and cause a side effect
  useEffect(() => {
    dispatch(getquestions());
  }, [dispatch]);

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.thead}>

        </thead>
        <div className={styles.div}>
          {Object.values(users).map((user) => <div key={user.id} user={user}> {user.body} </div>)}
        </div>
      </table>
    </div>
  );
};

export default UsersContainer;
