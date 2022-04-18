import "./MonthYearPicker.css";
import { Component } from "react";
import { withTranslation } from "react-i18next";

class MonthYearPicker extends Component {
    constructor(props) {
        super(props);

        const date = this.props.date || new Date();
        this.state = this.newDateState(date.getMonth(), date.getFullYear());
        this.props?.onChange(new Date(this.state.year, this.state.month));
    }

    newDateState = (month, year) => {
        return {
            previousMonth: month > 0 ? month - 1 : 11,
            month: month,
            nextMonth: (month + 1) % 12,
            previousYear: year - 1,
            year: year,
            nextYear: year + 1
        };
    };

    setDate = (month, year) => {
        this.setState((state) => {
            this.props?.onChange(new Date(year, month));
            return Object.assign(state, this.newDateState(month, year));
        });
    };

    onMonthsWheel = (event) => {
        event.preventDefault();
        if (event.deltaY > 0) {
            this.setDate(this.state.nextMonth, this.state.year);
        } else {
            this.setDate(this.state.previousMonth, this.state.year);
        }
    };

    onYearsWheel = (event) => {
        event.preventDefault();
        if (event.deltaY > 0) {
            this.setDate(this.state.month, this.state.nextYear);
        } else {
            this.setDate(this.state.month, this.state.previousYear);
        }
    };

    onShowPopupClick = () => {
        this.setState((state) =>
            Object.assign(state, {
                popup: true,
                monthSelector: true
            })
        );
    };

    onMonthsSelectorClick = () => {
        this.setState((state) => {
            console.log(state);
            return Object.assign(state, {
                monthSelector: false
            });
        });
    };

    onClosePopupClick = () => {
        this.setState((state) =>
            Object.assign(state, {
                popup: false
            })
        );
    };

    render() {
        const t = this.props.t;
        return (
            <div className="monthyearpicker">
                <div className="monthyearpicker__date" onClick={this.onShowPopupClick}>
                    {t(`months.${this.state.month}`)} {this.state.year}
                </div>
                {this.state.popup && (
                    <div className="monthyearpicker__popup">
                        <div className="monthyearpicker__content">
                            {this.state.monthSelector && (
                                <div className="monthyearpicker__selector" onWheel={this.onMonthsWheel}>
                                    <span className="monthyearpicker__item monthyearpicker__item--faded">
                                        {t(`months.${this.state.previousMonth}`)}
                                    </span>
                                    <span className="monthyearpicker__item monthyearpicker__item--selected">
                                        {t(`months.${this.state.month}`)}
                                    </span>
                                    <span className="monthyearpicker__item monthyearpicker__item--faded">
                                        {t(`months.${this.state.nextMonth}`)}
                                    </span>
                                    <div className="monthyearpicker__buttons">
                                        <button
                                            className="monthyearpicker__button"
                                            onClick={this.onMonthsSelectorClick}
                                        >
                                            Suivant
                                        </button>
                                    </div>
                                </div>
                            )}
                            {!this.state.monthSelector && (
                                <div className="monthyearpicker__selector" onWheel={this.onYearsWheel}>
                                    <span className="monthyearpicker__item monthyearpicker__item--faded">
                                        {this.state.previousYear}
                                    </span>
                                    <span className="monthyearpicker__item monthyearpicker__item--selected">
                                        {this.state.year}
                                    </span>
                                    <span className="monthyearpicker__item monthyearpicker__item--faded">
                                        {this.state.nextYear}
                                    </span>
                                    <div className="monthyearpicker__buttons">
                                        <button className="monthyearpicker__button" onClick={this.onClosePopupClick}>
                                            Suivant
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default withTranslation("dates")(MonthYearPicker);
