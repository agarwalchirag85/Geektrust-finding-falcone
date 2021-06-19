import React, { Component } from 'react';

import './header.css';

class Header extends Component {

    root = () => {
		this.props.history.push("/");
	  };
    handleClick=() =>{
        window.open("https://www.geektrust.in/", "_blank")
      };
    render() {
        return (
            <>
              <div className="header">
                    <nav className="nav-main">
                        <div className="header-title" onClick={this.root}>Finding Falcone? </div>
                            <ul>
                                <li onClick={this.props.reset}>Reset</li>
                                <li onClick={this.handleClick}>GeekTrustHome</li>
                            </ul>
                    </nav>
                </div>
            </>
        )
    }
}

export default Header;
