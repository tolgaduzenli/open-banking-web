import React from 'react'
import PropTypes from 'prop-types'
import FilterSelector from 'react-select'

const filterOptions = [
    { label: 'All', value: 'ALL' },
    { label: 'Approved', value: 'APPROVED' },
    { label: 'Rejected', value: 'REJECTED' },
    { label: 'Pending', value: 'PENDING' },
]

class StatusFilter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedFilter: { label: 'All', value: 'ALL' },
        }
    }

    onChange = selectedFilter => {
        const { onChangeFilter } = this.props
        this.setState({ selectedFilter })
        onChangeFilter(selectedFilter.value)
    }

    render() {
        const { selectedFilter } = this.state

        return (
            <div className="row">
                <div className="col s4 offset-s8">
                    <div className="row">
                        <span>Filter by status</span>
                    </div>
                    <div className="row">
                        <div className="col s4">
                            <FilterSelector
                                className="basic-single"
                                classNamePrefix="select"
                                placeholder="Filter by status"
                                name="filter"
                                options={filterOptions}
                                onChange={this.onChange}
                                value={selectedFilter}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
StatusFilter.propTypes = {
    onChangeFilter: PropTypes.func,
}
export default StatusFilter
