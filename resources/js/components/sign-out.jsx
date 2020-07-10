import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { CircularProgress } from '@material-ui/core';
import { DoneRounded } from '@material-ui/icons'
import Axios from 'axios';

const SignOutAnchor = () => {
    const showSignoutModal = (e) => {
        e.preventDefault();

        $("#signOutModal").modal('show');
    }

    return (
        <div>
            <a href="#" className="btn btn-default btn-flat" onClick={showSignoutModal}>Sign out</a>
        </div>
    )
}
// id=""

const SignOutModal = () => {
    const [state, setState] = useState({
        loading: false,
        loggedOut: false,
    });

    const closeModal = {
        marginTop: '-20px'
    }

    const modalDialog = {
        transform: 'translate(0, -50%)',
        top: '50%',
        margin: '0 auto'
    }

    const submitLogout = () => {
        setState({
            loading: true
        });


        Axios.post(`/api/logout`)
            .then(res => {
                if (res.status == 200) {
                    window.location.replace(res.data.route)
                }
            })
            .catch(err => {
                console.log((err));
            })
    }

    let submitButtonContent = state.loading ? <CircularProgress color="inherit" size={15} /> : 'Sign In'

    if (state.loggedOut) {
        submitButtonContent = <DoneRounded />;
    }

    return (
        <div
            className="modal fade"
            id="signOutModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="signOutModalTitle"
            aria-hidden="true">
            <div className="modal-dialog" style={modalDialog}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="signOutModalTitle">Logout ?</h5>
                        <button
                            type="button"
                            className="close"
                            style={closeModal}
                            data-dismiss="modal"
                            aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={submitLogout}>{submitButtonContent}</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export { SignOutAnchor, SignOutModal };

if (document.getElementById('react-sign-out-anchor')) {
    ReactDOM.render(<SignOutAnchor />, document.getElementById('react-sign-out-anchor'))
}

if (document.getElementById("signout-modal")) {
    ReactDOM.render(<SignOutModal />, document.getElementById('signout-modal'))
}
