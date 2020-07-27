import React from 'react';
import { render } from 'react-dom';
import BarChart from './component/BarChart';
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import { Handle, Track, Tick } from './component/SliderPartials';
const sliderStyle: React.CSSProperties = {
    margin: '5%',
    position: 'relative',
    width: '90%'
};

const railStyle: React.CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: 14,
    borderRadius: 2,
    cursor: 'pointer',
    backgroundColor: 'rgb(155,155,155)'
};

export interface IHistoSliderProps {
    data: any[];
    height?: number;
    width?: number;
};

class HistoSlider extends React.Component<IHistoSliderProps, {}> {
    sortedData = this.props.data.slice().sort((a, b) => a - b);
    range = [this.sortedData[0], this.sortedData[this.sortedData.length - 1]];

    public state = {
        domain: this.range,
        update: this.range,
        values: this.range,
        inputValues: this.range
    };

    constructor(props: IHistoSliderProps) {
        super(props);
    }

    public onChange = (dum: readonly number[]) => {
        this.setState({ values: dum });
    };

    render() {
        const { domain, values, update, inputValues } = this.state;
        return (
            <div>
                <BarChart data={this.props.data} highlight={update} domain={domain} height={50} width={600} />
                <Slider
                    mode={3}
                    step={5}
                    domain={domain}
                    rootStyle={{
                        position: "relative",
                        width: "100%"
                    }}
                    onUpdate={update =>
                        this.setState({ update, inputValues: update })
                    }
                    values={values}
                    onChange={(values) => this.onChange(values)}
                >
                    <Handles>
                        {({ handles, getHandleProps }) => (
                            <div className="slider-handles">
                                {handles.map(handle => (
                                    <Handle
                                        key={handle.id}
                                        handle={handle}
                                        domain={domain}
                                        getHandleProps={getHandleProps}
                                    />
                                ))}
                            </div>
                        )}
                    </Handles>
                </Slider>
            </div>
        );
    }
}

export default HistoSlider;
