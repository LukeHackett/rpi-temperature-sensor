import React from 'react';
import {observer, inject} from 'mobx-react';
import {Store, ReadingStore} from '../../stores';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import styles from './styles.module.css';

interface Props {
  readingStore?: ReadingStore;
}

class TemperatureChart extends React.Component<Props> {

  public render() {
    return (
      <LineChart className={styles.chart} width={750} height={500} data={this.props.readingStore?.readings}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Legend />
        {this.lines}
      </LineChart>
    );
  }

  private get lines() {
    return this.props.readingStore?.lineType
      .map((type, i) => (
        <Line key={`line-${i}`} type="monotone" dataKey={type.dataKey} stroke={type.colour} />
      ));
  }

}

export default inject(Store.READINGS)(observer(TemperatureChart));