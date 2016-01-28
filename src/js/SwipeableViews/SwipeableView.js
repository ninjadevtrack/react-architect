import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

export default class SwipeableView extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      activeIndex: props.initialIndex,
      swiping: false,
      swipeItemStyle: {},
      swipeStart: 0,
      swipeDistance: 0,
    };
  }

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    onSwipeMove: PropTypes.func,
    onChange: PropTypes.func,
    onSwipeStart: PropTypes.func,
    threshold: PropTypes.number.isRequired,
    initialIndex: PropTypes.number.isRequired,
    activeIndex: PropTypes.number,
  };

  static defaultProps = {
    initialIndex: 0,
    threshold: .4,
  };

  componentWillReceiveProps(nextProps) {
    if(this.props.activeIndex !== nextProps.activeIndex) {
      const distance = -this.refs.container.offsetWidth * nextProps.activeIndex;
      this.setState({
        swipeItemStyle: this.getSwipeItemStyle(distance),
        swipeDistance: distance,
      });
    }
  }

  componentDidMount() {
    this.setInitialSwipeDistance();
  }

  handleSwipeStart = (e) => {
    if(this.props.onSwipeStart) {
      this.props.onSwipeStart(e);
    }

    this.setState({
      swiping: true,
      swipeStart: e.changedTouches[0].pageX,
    });
  };

  handleSwipeMove = (e) => {
    const distance = this.calcSwipeDistance(e.changedTouches[0].pageX, 24);

    if(this.props.onSwipeMove) {
      this.props.onSwipeMove(distance, e);
    }

    this.setState({
      swipeItemStyle: this.getSwipeItemStyle(distance),
    });
  };

  handleSwipeEnd = (e) => {
    const x = e.changedTouches[0].pageX;
    let activeIndex = this.getActiveIndex();
    const { offsetWidth } = this.refs.container;
    const deltaX = offsetWidth * this.props.threshold;
    const swipeDistance = this.state.swipeStart - x;

    let distance = this.calcSwipeDistance(x, 0);
    if(swipeDistance > deltaX && activeIndex + 1 < this.props.children.length) {
      activeIndex++;
    } else if(swipeDistance < deltaX && activeIndex - 1 >= 0) {
      activeIndex--;
    }

    distance = -offsetWidth * activeIndex;

    if(this.props.onChange) {
      this.props.onChange(activeIndex, distance, e);
    }

    this.setState({
      swipeItemStyle: this.getSwipeItemStyle(distance),
      swiping: false,
      swipeDistance: distance,
      activeIndex,
    });
  };

  setInitialSwipeDistance = () => {
    const { offsetWidth } = this.refs.container;
    const index = this.getActiveIndex();
    const distance = this.calcSwipeDistance(offsetWidth * index, 0);

    this.setState({
      swipeItemStyle: this.getSwipeItemStyle(distance),
      swipeDistance: distance,
    });
  };

  calcSwipeDistance = (x, threshold) => {
    const { scrollWidth, offsetWidth } = this.refs.container;
    const distance = this.state.swipeDistance + (x - this.state.swipeStart);
    return Math.max(Math.min(distance, threshold), -scrollWidth - threshold + offsetWidth);
  };

  getSwipeItemStyle = (distance) => {
    const transform = `translateX(${distance}px)`;
    return {
      WebkitTransform: transform,
      MozTransform: transform,
      transform,
    };
  };

  getActiveIndex = () => {
    return typeof this.props.activeIndex === 'number' ? this.props.activeIndex : this.state.activeIndex;
  };

  render() {
    const { className, children } = this.props;
    const { swipeItemStyle, swiping } = this.state;

    const content = React.Children.map(children, (child, i) => {
      return React.cloneElement(child, {
        key: child.key || `swipe-item-${i}`,
        className: 'md-swipeable-item',
        style: Object.assign({}, child.props.style, swipeItemStyle),
      });
    });

    return (
      <section
        ref="container"
        className={classnames('md-swipeable-view', className, { swiping })}
        onTouchStart={this.handleSwipeStart}
        onTouchMove={this.handleSwipeMove}
        onTouchEnd={this.handleSwipeEnd}
      >
        {content}
      </section>
    );
  }
}
