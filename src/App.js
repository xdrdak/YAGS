import React, { Component } from 'react';
import cn from 'classnames';
import classes from './App.css';
import classesFlex from './FlexboxGrid/FlexboxGrid.css';
import { Grid, GridItem } from './FixedColumnGrid';

const MyH3 = ({ children }) => <h3 className="times mb0">{children}</h3>;
const Section = ({ children }) => <section className="mt4 mb4">{children}</section>;

const MyCard = ({ text, color }) => (
  <div className={classes.card} style={{ backgroundColor: color }}>{text}</div>
);

MyCard.defaultProps = {
  text: 'My Card!',
  color: '#2196F3',
}

class App extends Component {
  render() {
    return (
      <div className={classes.container}>
        <div>
          <h1 className="f1 lh-title fw9 mb3 mt0 pt3 bb bw2 tracked-mega tc">
            YAGS!
          </h1>
        </div>
        <p className="times lh-copy measure f4">
          It's been 0 days since the last css grid-framework! You know what that means? <strong>Yet another grid system!</strong>
          <br />
          <br />
          Yags is indeed a grid system, built for react, but uses css-grids first and flexbox as a fallback.
          This way, you get to enjoy the fun of fiddling with the new css-grids specification and build awesome
          layouts, without having to worry about compatibility issues.
        </p>
        <Section>
          <MyH3>The markup between flexbox and css-grid is similar</MyH3>
          <div className={classesFlex.row}>
            {Array(3).fill(0).map((_, i) => (
              <div className={classesFlex[`col-4`]}>
                <div className={classes.item}>
                  Col 3
                </div>
              </div>
            ))}
          </div>
          <h6 style={{textAlign:'center'}}>vs</h6>
          <Grid columns={3}>
            {Array(3).fill(0).map((_, i) => (
              <GridItem>
                <MyCard />
              </GridItem>
            ))}
          </Grid>
        </Section>
        <Section>
          <MyH3>It can also obviously do mobile!</MyH3>
          <Grid sm={3}>
            {Array(3).fill(0).map((_, i) => (
              <GridItem>
                <MyCard text='sm' color='#E91E63' />
              </GridItem>
            ))}
          </Grid>
          <hr />
          <Grid md={3}>
            {Array(3).fill(0).map((_, i) => (
              <GridItem>
                <MyCard text='md' color='#8BC34A' />
              </GridItem>
            ))}
          </Grid>
          <hr />
          <Grid lg={3}>
            {Array(3).fill(0).map((_, i) => (
              <GridItem>
                <MyCard text='lg' color='#FFC107' />
              </GridItem>
            ))}
          </Grid>
        </Section>
        <Section>
          <MyH3>But the true power is being able create fancier layouts for little markup changes!</MyH3>
          <Grid columns={3}>
            <GridItem tall={2} wide={2}>
              <MyCard />
            </GridItem>
            <GridItem>
              <MyCard />
            </GridItem>
            <GridItem>
              <MyCard />
            </GridItem>
            <GridItem wide={3}>
              <MyCard />
            </GridItem>
            <GridItem>
              <MyCard />
            </GridItem>
            <GridItem>
              <MyCard />
            </GridItem>
            <GridItem tall={2}>
              <MyCard />
            </GridItem>
            <GridItem>
              <MyCard />
            </GridItem>
            <GridItem>
              <MyCard />
            </GridItem>
          </Grid>
        </Section>
        <Section>
          <MyH3>
            Yags can gracefully fallback to a flexbox.
          </MyH3>
          <p className="mt0 mb3">
            <small>
              *The only thing you lose is the advanced layouting feature like row and col spanning.
              Fair tradeoff really.
            </small>
          </p>
          <Grid columns={4}>
            {Array(12).fill(0).map((_, i) => (
              <GridItem>
                <MyCard />
              </GridItem>
            ))}
          </Grid>
        </Section>
      </div>
    );
  }
}

export default App;
