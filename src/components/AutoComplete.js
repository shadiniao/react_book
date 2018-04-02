import React, {Component} from 'react';
import style from '../styles/auto-complete.less';
import {Input} from 'antd';

export default class AutoComplete extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            displayValue: '',
            activeItemIndex: -1
        }
        this.handleKeyDown = this
            .handleKeyDown
            .bind(this);
        this.handleChange = this
            .handleChange
            .bind(this);
    }

    handleChange(value) {
        this.setState({activeItemIndex: -1, displayValue: ''})
        this
            .props
            .onChange(value);
    }

    handleKeyDown(e) {
        const {activeItemIndex} = this.state;
        const {options} = this.props;

        switch (e.keyCode) {
            case 13:
                if (activeItemIndex > -1) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.handleChange(this.getItemValue(options[activeItemIndex]));
                }
                break;
            case 38:
            case 40:
                {
                    e.preventDefault;
                    const direction = e.keyCode === 38
                        ? 'up'
                        : 'down';
                    this.moveItem(direction);
                    break;
                }

            default:
                break;
        }
    }

    moveItem(direction) {
        const {activeItemIndex} = this.state;
        const {options} = this.props;

        let newIndex = -1;

        if (direction === 'up') {
            if (activeItemIndex === 0) {
                newIndex = options.length - 1;
            } else {
                newIndex = activeItemIndex - 1;
            }
        } else {
            if (activeItemIndex === options.length - 1) {
                newIndex = 0;
            } else {
                newIndex = activeItemIndex + 1;
            }
        }

        let displayValue = '';
        if (newIndex > -1) {
            displayValue = options[newIndex].value;
        }

        this.setState({activeItemIndex: newIndex, displayValue});
    }

    handleEnter(index) {
        const item = this.props.options[index];
        this.setState({
            activeItemIndex: index,
            displayValue: this.getItemValue(item)
        })
    }

    handleLeave() {
        this.setState({activeItemIndex: -1, displayValue: ''})
    }

    getItemValue(item) {
        return item.value;
    }

    render() {
        const {show, displayValue, activeItemIndex} = this.state;
        const {value, options} = this.props;

        return (
            <div className={style.wrapper}>
                <Input
                    type="text"
                    value={displayValue || value}
                    onChange={e => this.handleChange(e.target.value)}
                    onKeyDown={this.handleKeyDown}
                    onFocus={() => this.setState({show: true})}
                    onBlur={() => this.setState({show: false})}/> {show && options.length > 0 && (
                    <ul
                        className={style.options}
                        onMouseLeave={this
                        .handleLeave
                        .bind(this)}>
                        {options.map((item, index) => {
                            return (
                                <li
                                    key={index}
                                    className={index === activeItemIndex
                                    ? style.active
                                    : ''}
                                    onMouseEnter={() => this.handleEnter(index)}
                                    onClick={() => this.handleChange(this.getItemValue(item))}>
                                    {item.text || item}
                                </li>
                            )
                        })
}
                    </ul>
                )}
            </div>
        )
    }
}