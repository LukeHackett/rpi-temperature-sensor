import React from 'react';
import styles from './styles.module.css';
import {observer, inject} from 'mobx-react';
import {Checkbox, List, CheckboxProps} from 'semantic-ui-react'
import {Store, LocationStore} from '../../stores';
import Location from '../../model/Location';

interface Props {
  locationStore?: LocationStore;
}

class LocationSelector extends React.Component<Props> {

  public componentDidMount() {
    this.props.locationStore?.fetchLocations()
  }

  public render() {
    return (
      <>
        <h4>Locations</h4>
        <List className={styles.locations}>
          {this.props.locationStore?.locations.map(this.renderItem)}
        </List>
      </>
    );
  }

  private renderItem = (item: Location) => {
    return (
      <List.Item key={item.name}>
        <Checkbox label={item.name} defaultChecked={item.checked} onChange={this.onChange} />
      </List.Item>
    )
  }

  private onChange = (event: React.FormEvent<HTMLInputElement>, { label, checked }: CheckboxProps) => {
    this.props.locationStore?.toggleLocation(`${label}`, checked || false);
  }

}

export default inject(Store.LOCATION)(observer(LocationSelector));