import React, {PureComponent} from 'react';
import styles from './styles.module.css';
import TemperatureChart from '../../components/TemperatureChart';
import LocationSelector from '../../components/LocationSelector';
import {Container, Grid, Segment} from 'semantic-ui-react'

class GraphPage extends PureComponent {
  public render() {
    return (
      <Container className={styles.wrapper}>
        <Grid>
          <Grid.Column width={16}>
            <h1>Raspberry Pi Temperature Dashboard</h1>
          </Grid.Column>
          <Grid.Column width={4}>
            <Segment>
              <LocationSelector />  
            </Segment>
          </Grid.Column>
          <Grid.Column width={12}>
            <Segment>
              <TemperatureChart />
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default GraphPage;