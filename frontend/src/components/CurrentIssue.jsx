import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NotesContext from '../context/NotesContext';

const CurrentIssue = () => {
  const { issue } = useParams();
  const { currentIssue, setCurrentIssueName } = useContext(NotesContext);

  useEffect(() => {
    setCurrentIssueName(issue);
  }, [issue, setCurrentIssueName]);

  const { issue: currentIssueName = 'Loading...', resolution: currentIssueResolution = 'Loading...', explanation: currentIssueExplanation = 'Loading...' } = currentIssue[0] || {};

  return (
    <div>
      <h3>Current Issue:</h3>
      <div>{currentIssueName}</div>
      <h3>Resolution:</h3>
      <div>{currentIssueResolution}</div>
      <h3>Explanation:</h3>
      <div>{currentIssueExplanation}</div>
    </div>
  );
};

export default CurrentIssue;
