import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, UncontrolledDropdown} from 'reactstrap';
import PropTypes from 'prop-types';

import {AppAsideToggler, AppNavbarBrand, AppSidebarToggler} from '@coreui/react';
import logo from '../../assets/img/brand/Volluto.png';
import sygnet from '../../assets/img/brand/Volluto.png';

// import {hasRole} from '../../util/APIUtils';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {
    // eslint-disable-next-line
    const { children, user, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 30, height: 30, alt: 'Touch Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'Touch Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          {
            // hasRole(user, 'ADMIN') &&
              <NavItem className="px-3">
                <NavLink to="/dashboard" className="nav-link" >Dashboard</NavLink>
              </NavItem>
          }
        </Nav>

        <Nav className="ml-auto" navbar>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <img src={process.env.PUBLIC_URL + '/assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@innods.com" />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center"><i className="fa fa-user-md"/> <strong>{user && user.uid}</strong></DropdownItem>
              <DropdownItem><i className="fa fa-user"/> Profile<Badge color="primary">77</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-wrench"/> Settings</DropdownItem>

              <DropdownItem divider />

              {/*<DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"/> Logout</DropdownItem>*/}
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <AppAsideToggler className="d-md-down-none" mobile />
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
