import React, {Component, Fragment, useState} from 'react';
import {
  Alert,
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Label,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from 'reactstrap';

import {dictionaryApi, translateApi} from '../../util/APIUtils';
import {AppSwitch} from "@coreui/react";

import Files from 'react-files';
import htmlParse from "html-react-parser";

const wordListStyle = { overflowY: 'auto', height: window.innerHeight*3/5 };

const dropZoneStyle = {
  display: "table-cell",
  verticalAlign: "middle",
  textAlign: "center",
  padding: "10px",
  border: "1px dashed #D3D3D3",
  cursor: "pointer",
};

const InputWords = (props) => {
  const importFile = (files) => props.importFile(files);
  const importUrl = (name, url) => props.importUrl(name, url);

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  return (
    <Fragment>
      <Row>
        <Col xs="12">
          <div>
            <Files className="files-dropzone-list"
                   ref={props.files}
                   style={dropZoneStyle}
                   onChange={(files) => importFile(files)}
                   onError={(error) => { console.debug(error); }}
                   accepts={[".csv", "text/csv"]}
                   multiple
                   maxFiles={1}
                   maxFileSize={10240000}
                   minFileSize={0}
                   clickable>
              영단어 파일을 여기에 가져놓으~~~
            </Files>
          </div>
        </Col>
      </Row>
      <DropdownItem divider />
      <Row>
        <Col xs="12">
          <FormGroup>
            <InputGroup>
              <Input type="text" id="google_spreadsheet" name="google_spreadsheet" placeholder="google spreadsheet id"
                     onChange={(e) => { setName(e.target.name); setUrl(e.target.value); }} />
              <InputGroupAddon addonType="append">
                <Button type="button" color="danger" onClick={() => importUrl(name, url)}><i className="fa fa-refresh"></i></Button>
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>
        </Col>
      </Row>
    </Fragment>
  );
}

const dict_cambridge = 'https://dictionary.cambridge.org/ko/%EC%82%AC%EC%A0%84/%EC%98%81%EC%96%B4-%ED%95%9C%EA%B5%AD%EC%96%B4/';
const dict_merriam = 'https://www.merriam-webster.com/dictionary/';

class Word extends Component {

  constructor(props) {
    super(props);

    this.state = {
      alertVisible: false,
      alertMessage: "",

      groupCollapse: true,
      viewCollapse: true,

      loadWordModal: false,

      searchPattern: "",

      listWords: {},
      activeWord: "",
      activeDef: "",
      selectedWord: {},

      validate: {},
      audioPlay: false,

      iframe: "",
      iframe2: "",
    };

    this.files = React.createRef();

    this.toggle = this.toggle.bind(this);
    this.validate = this.validate.bind(this);
    this.loadWordModal = this.loadWordModal.bind(this);
    this.handleWordPlay = this.handleWordPlay.bind(this);

    this.searchWord = this.searchWord.bind(this);
    this.handleSearchPattern = this.handleSearchPattern.bind(this);

    this.importFile = this.importFile.bind(this);
    this.importUrl = this.importUrl.bind(this);
    this.lookupWord = this.lookupWord.bind(this);
  }

  componentDidMount() {
  }

  onShowAlert = (message) => {
    this.setState({
      alertVisible: true,
      alertMessage: JSON.stringify(message),
    }, () => {
      window.setTimeout(() => {
        this.setState({ alertVisible: false })
      }, 10000);
    });
  }

  toggle(e, word) {
    e.preventDefault();
    const { activeWord, listWords } = this.state;

    if (activeWord !== word) {
      let selectedWord = listWords[word];

      console.debug("selected", selectedWord);

      if (!selectedWord.loaded) {
        Promise.all([
          dictionaryApi("en", word),
          translateApi("en", "ko", word)
        ]).then(response => {
          console.debug("dic=", response[0], response[1]);

          selectedWord.name = word;
          if (Array.isArray(response[0]) && response[0] &&
            Array.isArray(response[0][0].phonetics) && response[0][0].phonetics) {
            selectedWord.phonetics = response[0][0].phonetics[0];
          }
          if (response[1].message) {
            selectedWord.definition = ((response[1].message || {}).result || {}).translatedText;
          }
          selectedWord.loaded = true;

          this.setState({
            activeWord: word,
            activeDef: selectedWord.definition,
            selectedWord: selectedWord,
            validate: {},
          });
        }).catch(error => {
          this.onShowAlert(error);
        });
      } else {
        this.setState({
          activeWord: word,
          activeDef: selectedWord.definition,
          selectedWord: selectedWord,
          validate: {},
        });
      }
    }
  }

  searchWord(event) {
    event.preventDefault();
    let { searchPattern } = this.state;

    Promise.all([
      dictionaryApi("en", searchPattern),
      translateApi("en", "ko", searchPattern)
    ]).then(response => {
      console.debug("dic=", response[0], response[1]);

      let selectedWord = {
        name: searchPattern
      };
      if (Array.isArray(response[0]) && response[0] &&
        Array.isArray(response[0][0].phonetics) && response[0][0].phonetics) {
        selectedWord.phonetics = response[0][0].phonetics[0];
      }
      if (response[1].message) {
        selectedWord.definition = ((response[1].message || {}).result || {}).translatedText;
      }
      selectedWord.loaded = true;

      this.setState({
        activeWord: searchPattern,
        activeDef: selectedWord.definition,
        selectedWord: selectedWord,
        validate: {},
      });
    }).catch(error => {
      this.onShowAlert(error);

      this.setState({
        activeWord: "",
        activeDef: "",
        selectedWord: {},
        validate: {},
      });
    });
  }

  validate(event) {
    const { validate, selectedWord } = this.state;

    if (selectedWord) {
      const { target } = event;
      let value = target.type === 'checkbox' ? target.checked : target.value;
      const { name } = target;

      validate[name] = (selectedWord[name] || "").toLowerCase().trim() === value.toLowerCase().trim();

      this.setState({ validate });
    }
  }

  loadWordModal() {
    this.setState({
      loadWordModal: !this.state.loadWordModal,
    });
  }

  handleWordPlay(event) {
    event.preventDefault();
    const { selectedWord } = this.state;

    this.setState({ audioPlay: true });

    if (selectedWord && selectedWord.phonetics && selectedWord.phonetics.audio) {
      let audio = new Audio(selectedWord.phonetics.audio);
      let play = audio.play();
      if (play) {
        play.then(() => this.setState( { audioPlay: false }) );
      }
    } else {
      if (speechSynthesis) {
        if (!speechSynthesis.speaking) {
          let utterance = new SpeechSynthesisUtterance(selectedWord.name);
          utterance.onend = (event) => {
            console.debug('speak= ', event.elapsedTime + ' ms');
            this.setState( { audioPlay: false });
          }
          speechSynthesis.speak(utterance);
        }
      }
    }
  }

  handleSearchPattern = async (event) => {
    const { target } = event;
    this.setState({ searchPattern: target.value });
  }

  importFile(files) {
    console.debug(files);
    if (files && files.length > 0) {
      let blob = new Blob([files[0]], { type: files[0].type });

      const reader = new FileReader();
      reader.addEventListener('loadend', (e) => {
        try {
          console.debug('import=', e.target.result);

          let listWords = {};
          let words = (e.target.result || "").split('\n');
          (words || {}).forEach(word => {
            if (word.trim()) {
              listWords[word.trim()] = {
                isDone: false
              };
            }
          });

          this.setState({
            listWords: listWords,
            selectedWord: {},
            validate: {},
            loadWordModal: !this.state.loadWordModal,
          });
        } catch(e) {
          console.debug('import=', e);
        }
      });

      reader.readAsText(blob);

      this.files.current.removeFiles();
    }
  }

  importUrl(name, url) {
    if (name === 'google_spreadsheet' && url) {
      let downloadUrl = url.trim();
      if (!downloadUrl.startsWith("http")) {
        downloadUrl = 'https://docs.google.com/spreadsheets/d/' + downloadUrl + '/export?format=csv';
      }

      console.debug("import=", name, downloadUrl);

      fetch(downloadUrl, { method: 'GET' })
        .then(response =>
          response.text().then(text => {
            if (response.ok && text) {
              console.debug("import response=", text);

              let listWords = {};
              let words = text.split('\n');
              (words || {}).forEach(word => {
                if (word.trim()) {
                  listWords[word.trim()] = {
                    isDone: false
                  };
                }
              });

              this.setState({
                listWords: listWords,
                selectedWord: {},
                validate: {},
                loadWordModal: !this.state.loadWordModal,
              });
            }
          })
        ).catch(error => {
          console.debug("import error=", error);
        });
    }
  }

  lookupWord(event) {
    event.preventDefault();

    const { selectedWord } = this.state;

    if (selectedWord.loaded) {
      this.setState({
        iframe: '<iframe src="' + dict_cambridge + selectedWord.name + '"></iframe>',
        iframe2: '<iframe src="' + dict_merriam + selectedWord.name + '"></iframe>',
      });
    }
  }

  shuffleWord(s) {
    let n = s;
    if (n) {
      if (n.length > 3) {
        while (n === s) {
          let arr = s.split('');
          arr.sort(() => 0.5 - Math.random());
          n = arr.join('');
        }
      } else {
        n = this.genHiddenWord('⭐', n.length);
      }
    }
    return n;
  }

  genHiddenWord(ch, num) {
    let r = ch;
    for (let i = 1; i < num; i++) {
      r += ch;
    }
    return r;
  }

  render() {
    const { listWords, activeWord, activeDef, searchPattern, validate, audioPlay, iframe, iframe2 } = this.state;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"/><strong>단어 리스트</strong>
                <div className="card-header-actions">
                  <Button type="button" color="ghost-warning" onClick={this.loadWordModal}><i className="icon-cloud-download"/></Button>
                  <Button color="light" onClick={() => { this.setState({ groupCollapse: !this.state.groupCollapse }); }}><i className="icon-arrow-up"/></Button>
                  <Badge color="warning">Word</Badge>
                </div>

                <Modal isOpen={this.state.loadWordModal} toggle={this.loadWordModal}
                       className={'modal-success ' + this.props.className}>
                  <ModalHeader toggle={this.loadWordModal}>Load Words</ModalHeader>
                  <ModalBody>
                    <InputWords files={this.files} importFile={this.importFile} importUrl={this.importUrl} />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="secondary" onClick={this.loadWordModal}>Cancel</Button>
                  </ModalFooter>
                </Modal>
              </CardHeader>
              <Collapse isOpen={this.state.groupCollapse}>
                <CardBody>
                  <Row>
                    <Col xs="4">
                      <FormGroup>
                        <InputGroup>
                          <Input type="text" id="searchPattern" name="searchPattern" placeholder="Search Pattern"
                                 value={searchPattern}
                                 onChange={ (e) => this.handleSearchPattern(e) }
                                 onKeyDown={ (e) => {
                                   if (e.key === 'Enter') {
                                     this.searchWord(e);
                                   }
                                 }}
                          />
                          <InputGroupAddon addonType="append">
                            <Button type="button" color="primary" onClick={this.searchWord}><i className="fa fa-search"/></Button>
                          </InputGroupAddon>
                        </InputGroup>
                      </FormGroup>

                      <ListGroup id="list-tab" role="tablist" style={wordListStyle}>
                        {
                          Object.keys(listWords).sort().map((key, index) => {
                            return (
                              <ListGroupItem key={key} onClick={(e) => this.toggle(e, key)} action active={activeWord === key}>
                                {listWords[key].isDone ? key : this.genHiddenWord('⭐', (key || "").length)}
                              </ListGroupItem>
                            );
                          })
                        }
                      </ListGroup>
                    </Col>
                    <Col xs="8">
                      <Card>
                        <Form action="" className="form-horizontal" onSubmit={(e) => this.lookupWord(e)}>
                        <CardHeader>
                          <blockquote className="blockquote">
                            <p className="mb-0 h2">
                              {this.shuffleWord(activeWord)} <span role="img" aria-label="donut">🍩</span> {this.shuffleWord(activeDef)}
                            </p>
                          </blockquote>
                        </CardHeader>
                        <CardBody>
                          <Row>
                            <Col xs="12">
                              <FormGroup>
                                <Label htmlFor="name">단어</Label>
                                <Input type="text" id="name" name="name" placeholder="word"
                                       valid={validate.name}
                                       invalid={!validate.name}
                                       onChange={ (e) => {
                                         this.validate(e)
                                       } } />
                                <FormFeedback invalid>
                                  단어를 잘 넣으셈!
                                </FormFeedback>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col xs="12">
                              <FormGroup>
                                <Label htmlFor="definition">뜻</Label>
                                <Input type="text" id="definition" name="definition" placeholder="Definition"
                                       valid={validate.definition}
                                       invalid={!validate.definition}
                                       onChange={ (e) => {
                                         this.validate(e)
                                       } } />
                                <FormFeedback invalid>
                                  뜻을 잘 넣으셈!
                                </FormFeedback>
                              </FormGroup>
                            </Col>
                          </Row>
                          <DropdownItem divider />
                          <Row>
                            <Col xs="12">
                              <FormGroup>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col xs="6">
                            </Col>
                            <Col xs="4">
                              <Button color="light" className="btn-pill" block disabled>듣기</Button>
                            </Col>
                            <Col xs="2">
                              <AppSwitch name="enabled" className={'mx-1'} variant={'pill'} color={'primary'} size={'lg'} checked={audioPlay}
                                         onChange={ (e) => {
                                           this.handleWordPlay(e)
                                         } } />
                            </Col>
                          </Row>
                        </CardBody>
                        <CardFooter>
                          <Row>
                            <Col xs="8">
                            </Col>
                            <Col xs="4">
                              <Button type="submit" color="ghost-primary" size="nm" block><i className="fa fa-database"/> 상세보기</Button>
                            </Col>
                          </Row>
                          {this.state.alertVisible &&
                            <Fragment>
                            <DropdownItem divider/>
                            <Row>
                              <Col xs="12">
                                <Alert color="warning" isOpen={this.state.alertVisible} >
                                {this.state.alertMessage}
                                </Alert>
                              </Col>
                            </Row>
                            </Fragment>
                          }
                        </CardFooter>
                        </Form>
                      </Card>

                      {iframe2 &&
                      <Row>
                        <Col>
                          {
                            htmlParse(iframe2, {
                              replace: domNode => {
                                if (domNode.name === 'iframe') {
                                  domNode.attribs.width = "100%";
                                  domNode.attribs.height = "320";
                                }
                              }
                            })
                          }
                        </Col>
                      </Row>
                      }
                    </Col>
                  </Row>
                </CardBody>
              <CardFooter>
              </CardFooter>
              </Collapse>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"/><strong>Word Dictionary</strong> <small/>
                <div className="card-header-actions">
                  <Button color="light" onClick={() => { this.setState({ viewCollapse: !this.state.viewCollapse }); }}><i className="icon-arrow-up"/></Button>
                  <Badge>Word</Badge>
                </div>
              </CardHeader>
              <Collapse isOpen={this.state.viewCollapse}>
                <CardBody>
                  {iframe &&
                  <Row>
                    <Col>
                      {
                        htmlParse(iframe, {
                          replace: domNode => {
                            if (domNode.name === 'iframe') {
                              domNode.attribs.width = "100%";
                              domNode.attribs.height = "1024";
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

export default Word;
