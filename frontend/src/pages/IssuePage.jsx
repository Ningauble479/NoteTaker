import React from 'react'
import IssueSearch from '../components/IssueSearch'
import CurrentIssue from '../components/CurrentIssue'

const IssuePage = () => {
    return (
        <div className='IssuePageMain'>
            <IssueSearch/>
            <CurrentIssue/>
        </div>
    )
}

export default IssuePage