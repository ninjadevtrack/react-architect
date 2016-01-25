import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { RaisedButton } from 'react-md';

import './_home.scss';
import * as components from '../components';
import { toDashedName } from '../Documentation/utils';

const firstLink = 'components/' + toDashedName(Object.keys(components)[0]);

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    history: PropTypes.object, // from react-router
  };

  componentDidMount() {
    this.appBar = document.querySelector('.react-md-docs-toolbar');
    this.appBar.classList.add('no-shadow');
    window.addEventListener('scroll', this.updateToolbar);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.updateToolbar);
    this.appBar.classList.remove('no-shadow');
  }

  updateToolbar = () => {
    const isEnabled = window.scrollY < 600;
    const isClassed = this.appBar.classList.contains('no-shadow');
    if(isEnabled && !isClassed) {
      this.appBar.classList.add('no-shadow');
    } else if(!isEnabled && isClassed) {
      this.appBar.classList.remove('no-shadow');
    }
  };

  viewDemo = () => {
    this.props.history.pushState(null, `/${firstLink}`);
  };

  render() {
    return (
      <div className="home">
        <section className="banner">
          <h1 className="md-display-2">react-md</h1>
          <h4 className="md-title">Material Design inspired React components built with sass</h4>
          <RaisedButton onClick={this.viewDemo} secondary label="Demo" />
        </section>
        <section className="about">
          <div className="text-container">
            <p>
              This project was created because I learn by doing and I wanted to learn Material Design.
              There are already some other projects out there that are a lot farther along, so
              those might be a better choice for you. I do think the other projects are set up
              on inline styling, which I am not a fan of personally.
            </p>
            <p>
              The eventual goal of this project is to be able to quickly set up a material design
              website by changing a few variables or using the given sass mixins/functions for
              fine tuning.
            </p>
          </div>
        </section>
        <section className="getting-started">
        </section>
      </div>
    );
  }
}
