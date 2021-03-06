import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as vendorActions from '../../actions/actions.js';

class DeleteVendor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: '',
    }
    this.removeVendor = this.removeVendor.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { open } = nextProps;
    if (open === 'delete') {
      this.setState({
        modalOpen: open
      })
    } else
      this.setState({
        modalOpen: ""
      })
  }

  removeVendor() {
    const { selectedVendor } = this.props;
    this.props.actions.removeVendor(selectedVendor.key);
    this.props.close();
  }

  render() {
    return (
      <div className="delete-vendors">
        <div className="modal fade"
          id={`${this.state.modalOpen}-visible`}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  id="icons"
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close" onClick={() => this.props.close()}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <h4> Delete Vendor? </h4>
                <p>This action cannot be reversed.</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                  onClick={this.removeVendor}
                >Yes
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => this.props.close()}
                > No
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => (
  {
    vendors: state
  }
)

const mapDispatchToProps = dispatch => (
  {
    actions: bindActionCreators(vendorActions, dispatch)
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(DeleteVendor);
