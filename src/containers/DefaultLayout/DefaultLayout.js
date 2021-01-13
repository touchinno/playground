import React, {Component, Suspense} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Container} from 'reactstrap';

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
import navigation from '../../_nav';
import routes from '../../routes';

import {hasRole} from "../../util/APIUtils";

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));


class DefaultLayout extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      isAuthenticated: true,
    };

    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  componentDidMount() {
    this.loadCurrentUser();
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.debug('process.env', process.env);

    if (process.env.NODE_ENV === "development") {
      if (process.env.REACT_APP_IGNORE_AUTH === "true") {
        return true;
      }
    }

    // if (!nextState.isAuthenticated) {
    //   this.props.history.push("/login");
    //   return false;
    // }

    return true;
  }

  loadCurrentUser() {
    // getCurrentUser()
    //   .then(response => {
    //     this.setState({
    //       currentUser: response,
    //       isAuthenticated: true,
    //     });
    //
    //     console.debug('user=', response);
    //   }).catch(error => {
    //     this.setState({
    //       currentUser: null,
    //       isAuthenticated: false
    //     });
    //   });
  }

  handleLogout(e) {
    e.preventDefault();

    // localStorage.removeItem(ACCESS_TOKEN);
    //
    // this.setState({
    //   currentUser: null,
    //   isAuthenticated: false
    // });
  }

  render() {
    const { currentUser } = this.state;

    let navconfig = {};
    navconfig['items'] = navigation.items.filter((item) => {
      let roles = item.roles || [];
      if (roles.length === 0) {
        return true;
      } else {
        if (roles.filter(role => hasRole(currentUser, role)).length) {
          return true;
        }
      }
      return false;
    });

    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader onLogout={this.handleLogout} user={currentUser} {...this.props} />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
            <AppSidebarNav navConfig={navconfig} {...this.props} />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes}/>
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/" to="/dashboard" />
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
