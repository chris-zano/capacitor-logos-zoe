import React from 'react'
import PrivacyPolicyComponent from '../../Components/AboutComponents/PrivacyPolicyComponent.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

function PrivacyPolicyPage() {
    return (
        <div>
        {/* AppBar Header */}
        <header>
            <div id="read-appbar">
                <div
                    className="row"
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '0 3ch 0 1ch',
                    }}
                >
                    <button onClick={() => window.history.back()}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                        <span style={{ marginLeft: '2ch' }} className='poppins-regular'>Privacy Policy</span>
                    </button>
                </div>
            </div>
        </header>

        {/* Content */}
        <main style={{marginTop: '3.7rem', paddingBottom: "2ch" }}>
            <PrivacyPolicyComponent />
        </main>
    </div>   
    )
}

export default PrivacyPolicyPage
