import React, { Component } from 'react'
import './footer.css';

export class Footer extends Component {
    render() {
        return (
            <>
                <div className="footer">
                    <div className="container-footer">
                        <div className='content-footer'>
                            <p>@copyright</p>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Footer
