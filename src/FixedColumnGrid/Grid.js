import React, { Component } from 'react';
import propTypes from 'prop-types';
import classes from './Grid.css';
import cn from 'classnames';

const validSizes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const validSizesProp = propTypes.oneOf(validSizes);

class GridItem extends Component {
  render() {
    return (
      <div className={cn(
        classes['grid__item'],
        this.props.tall && classes[`grid__item--tall-${this.props.tall}-lg`],
        this.props.wide && classes[`grid__item--wide-${this.props.wide}-lg`],
      )}>
        {this.props.children}
      </div>
    );
  }
}

GridItem.propTypes = {
  children: propTypes.node,
  tall: validSizesProp,
  wide: validSizesProp,
}

class Grid extends Component {
  render() {
    const {
      columns,
      lg,
      md,
      sm
    } = this.props;
    console.log(this.props.key);

    return (
      <div className={cn(
        classes.grid,
        sm && classes[`grid--${sm}-sm`],
        md && classes[`grid--${md}-md`],
        lg && classes[`grid--${lg}-lg`],
        columns && classes[`grid--${columns}`],
      )}>
        {this.props.children}
      </div>
    );
  }
}

Grid.propTypes = {
  children: propTypes.node,
  columns: validSizesProp,
  lg: validSizesProp,
  md: validSizesProp,
  sm: validSizesProp,
}

Grid.defaultProps = {
  columns: 1,
  lg: 0,
  md: 0,
  sm: 0,
}

export default Grid;
export { Grid, GridItem };
