import React, { Component } from 'react';
import { Modal, Form, Input, Header, Button, Icon} from 'semantic-ui-react';
import { getDate, getYear, getMonth } from 'date-fns';

export class RunsAddModal extends Component {

  constructor(props) {
    super(props);

    const date = Date.now();

    this.state = {
      km: 0,
      meters: 0,
      hours: 0,
      mins: 0,
      seconds: 0,
      day: getDate(date),
      year: getYear(date),
      month: getMonth(date) + 1,
      addInProgress: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleChange(event, { name, value }) {
    this.setState({ [name]: parseInt(value, 10) })
  }

  canSubmit() {
    return (this.state.seconds > 0 || this.state.mins > 0 || this.state.hours > 0)
      && (this.state.meters > 0 || this.state.km > 0);
  }

  submit() {
    if(this.canSubmit()){
      this.setState({ addInProgress: true });
      this.props.addRun({
        userId: this.props.userId,
        distance: (this.state.km * 1000) + this.state.meters,
        duration: (this.state.hours * 60 * 60) + (this.state.mins * 60) + (this.state.seconds),
        date: `${this.state.year}-${this.state.month}-${this.state.day}`
      })
        .then(() => {
          this.setState({ addInProgress: false });
          this.props.close();
        })
        .catch(() => {
          this.setState({ addInProgress: false });
        });
    }
  }

  render() {
    const inlineStyle = {
      modal: {
        marginTop: '0px !important',
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    };


    return (
      <Modal open={this.props.open} style={inlineStyle.modal}>
        <Modal.Content>
          <Header>How far did you run?</Header>
          <Form onSubmit={this.submit} loading={this.state.addInProgress}>
            <Form.Group inline>
              <Form.Field>
                <Input label="km"
                       type='number'
                       labelPosition="right"
                       name="km"
                       value={this.state.km}
                       onChange={this.handleChange}
                       min="0" max="999"
                       required
                />
              </Form.Field>
              <Form.Field>
                <Input label="meters"
                       type='number'
                       labelPosition="right"
                       name="meters"
                       value={this.state.meters}
                       onChange={this.handleChange}
                       min="0" max="999"
                       required
                />
              </Form.Field>
            </Form.Group>
            <Header>How long did you run for?</Header>
            <Form.Group inline>
              <Form.Field>
                <Input label="hours"
                       type='number'
                       labelPosition="right"
                       name="hours"
                       value={this.state.hours}
                       onChange={this.handleChange}
                       min="0" max="24"
                       required
                />
              </Form.Field>
              <Form.Field>
                <Input label="mins"
                       type='number'
                       labelPosition="right"
                       name="mins"
                       value={this.state.mins}
                       onChange={this.handleChange}
                       min="0" max="60"
                       required
                />
              </Form.Field>
              <Form.Field>
                <Input label="secs"
                       type='number'
                       labelPosition="right"
                       name="seconds"
                       value={this.state.seconds}
                       onChange={this.handleChange}
                       min="0" max="60"
                       required
                />
              </Form.Field>
            </Form.Group>
            <Header>When did you run?</Header>
            <Form.Group inline>
              <Form.Field>
                <Input label="yyyy"
                       type='number'
                       labelPosition="right"
                       name="year"
                       value={this.state.year}
                       onChange={this.handleChange}
                       min="2000" max="2050"
                       required
                />
              </Form.Field>
              <Form.Field>
                <Input label="mm"
                       type='number'
                       labelPosition="right"
                       name="month"
                       value={this.state.month}
                       onChange={this.handleChange}
                       min="1" max="12"
                       required
                />
              </Form.Field>
              <Form.Field>
                <Input label="dd"
                       type='number'
                       labelPosition="right"
                       name="day"
                       value={this.state.day}
                       onChange={this.handleChange}
                       min="1" max="31"
                       required
                />
              </Form.Field>
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color="red" onClick={this.props.close}>
            <Icon name="remove" /> Cancel
          </Button>
          <Button primary disabled={!this.canSubmit()} onClick={this.submit}>
            <Icon name="checkmark" /> Submit
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default RunsAddModal;
