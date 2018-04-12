import React, { Component } from 'react';
import { Loader, Dimmer, Table, Statistic, Label } from 'semantic-ui-react';
import { getTime } from 'date-fns';
import { toStandardDateFormat } from '../utils/dateUtils';

export class RunsTable extends Component {

  getDistanceKm(distanceMeters){
    return (distanceMeters / 1000).toFixed(2);
  }

  getDurationMin(durationSeconds){
    return (durationSeconds / 60).toFixed(2);
  }

  getTotalKCal(kCalMin, durationSeconds){
    return (kCalMin * this.getDurationMin(durationSeconds)).toFixed(2)
  }

  renderRuns(runs) {
    const orderedRuns = Array.from(runs);

    orderedRuns.sort((a, b) => {
      return getTime(b.date) - getTime(a.date);
    });

    return orderedRuns.map((run) => {
      return (
        <Table.Row>
          <Table.Cell>
            <Label ribbon color='blue' size="large">{toStandardDateFormat(run.date)}</Label>
          </Table.Cell>
          <Table.Cell>
            <Statistic size="mini" horizontal>
              <Statistic.Value>{this.getDistanceKm(run.distance)}</Statistic.Value>
              <Statistic.Label>Kilometers</Statistic.Label>
            </Statistic>
          </Table.Cell>
          <Table.Cell>
            <Statistic size="mini" horizontal>
              <Statistic.Value>{this.getDurationMin(run.duration)}</Statistic.Value>
              <Statistic.Label>mins</Statistic.Label>
            </Statistic>
          </Table.Cell>
          <Table.Cell>
            <Statistic size="mini" horizontal>
              <Statistic.Value>{this.getTotalKCal(run.kCalMin, run.duration)}</Statistic.Value>
              <Statistic.Label>kcal</Statistic.Label>
            </Statistic>
          </Table.Cell>
        </Table.Row>
      );
    });
  }

  render() {
    if (this.props.runs) {
      return (
        <Table fluid striped>
          <Table.Body>
            {this.renderRuns(this.props.runs)}
          </Table.Body>
        </Table>
      );
    }

    return (
      <Dimmer active inverted>
        <Loader size="massive">Loading</Loader>
      </Dimmer>
    )
  }
}

export default RunsTable;
