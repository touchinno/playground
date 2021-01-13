import React, {Component} from 'react';
import {Badge, Button, Card, CardBody, CardHeader, Col, Collapse, Row,} from 'reactstrap';
import htmlParse from 'html-react-parser';


class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapse: true,
      interval: undefined,

      iframe: '<iframe src="https://www.merriam-webster.com/word-of-the-day" height="1024" width="800"></iframe>',

      width: window.innerWidth,
    };

    this.refresh = this.refresh.bind(this);
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
    const { interval } = this.state;
    if (interval) {
      clearInterval(interval);
    }
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  componentDidMount() {
  }

  refresh(e) {
    let { interval } = this.state;

    console.debug('refresh', e);

    if (interval) {
      clearInterval(interval);
      interval = undefined;
    } else {
      interval = setInterval(() => {
        this.refreshSignal();
      }, 5000);
    }

    this.setState({interval: interval});
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    const { interval, iframe } = this.state;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"/><strong>Word of The Day</strong> <small>word</small>
                <div className="card-header-actions">
                  <Button type="button" color="ghost-warning" onClick={ (e) => { this.refresh(e); } }>
                    {interval ?
                      <i className="icon-control-pause"/> :
                      <i className="icon-control-play"/>
                    }
                  </Button>
                  <Button color="light" onClick={ () => { this.setState({ collapse: !this.state.collapse }); } }><i className="icon-arrow-up"/></Button>
                  <Badge color="warning">Signal</Badge>
                </div>
              </CardHeader>
              <Collapse isOpen={this.state.collapse}>
              <CardBody>
                {iframe &&
                <Row>
                  <Col>
                    {
                      htmlParse(iframe, {
                        replace: domNode => {
                          if (domNode.name === 'iframe') {
                            domNode.attribs.width = "100%";
                          }
                        }
                      })
                    }
                  </Col>
                </Row>
                }
              </CardBody>
              </Collapse>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
