import React from 'react';
import { connect } from 'react-redux'
import { Bar } from 'react-chartjs-2'

const SIXERR_GREEN = 'rgb(43, 190, 118)'

class _ProfileCharts extends React.Component {

    state = {
        chart: {
            labels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
            datasets: [
                {
                    label: 'Revenue',
                    // data: [158, 237, 395, 316, 474, this.props.income],
                    data: [158, 237, 395, 316, 474, 632],
                    backgroundColor: [
                        SIXERR_GREEN,
                        SIXERR_GREEN,
                        SIXERR_GREEN,
                        SIXERR_GREEN,
                        SIXERR_GREEN,
                        SIXERR_GREEN
                    ]
                },

            ]

        }
    }
    render() {
        const { chart } = this.state

        return (
            <>
                <Bar
                    data={chart}
                    options={{
                        // responsive: true,
                        // maintainAspectRatio: false,
                        layout: {
                            padding: {
                                top: 5,
                                left: 0,
                                right: 0,
                                bottom: 15
                            }
                        },
                        scales: {
                            xAxes: [{
                                ticks: { display: true },
                                gridLines: {
                                    display: false,
                                    drawBorder: true
                                }
                            }],
                            yAxes: [{
                                ticks: { display: true },
                                gridLines: {
                                    display: false,
                                    drawBorder: true
                                }
                            }]
                        }
                    }
                    }
                    width={100}
                    height={80}
                />
            </>
        )
    }
}

const mapGlobalStateToProps = (state) => {
    return {
        user: state.userModule.user,
        // gigs: state.gigModule.gigs,
        // orders: state.orderModule.orders
    }
}
const mapDispatchToProps = {
}

export const ProfileCharts = connect(mapGlobalStateToProps, mapDispatchToProps)(_ProfileCharts)

                // },
                // {
                //     label: 'Orders',
                //     data: [2, 3, 5, 4, 6, 8],
                //     backgroundColor: [
                //         SIXERR_GREEN,
                //         SIXERR_GREEN,
                //         SIXERR_GREEN,
                //         SIXERR_GREEN,
                //         SIXERR_GREEN,
                //         SIXERR_GREEN
                //     ]

