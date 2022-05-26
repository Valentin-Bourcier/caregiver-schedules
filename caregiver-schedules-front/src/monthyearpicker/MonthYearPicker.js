import "./MonthYearPicker.css";
import { Component } from "react";
import { withTranslation } from "react-i18next";

import AngleUpIcon from "../assets/icons/angle-up.svg";
import AngleDownIcon from "../assets/icons/angle-down.svg";
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

    onNextMonth = () => this.setDate(this.state.nextMonth, this.state.year);
    onPreviousMonth = () => this.setDate(this.state.previousMonth, this.state.year);

    onNextYear = () => this.setDate(this.state.month, this.state.nextYear);
    onPreviousYear = () => this.setDate(this.state.month, this.state.previousYear);

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
                                <div className="monthyearpicker__selector">
                                    <header className="monthyearpicker__selector-header">{t(`date.month`)}</header>
                                    <main className="monthyearpicker__selector-content">
                                        <span
                                            className="monthyearpicker__navigate-button"
                                            onClick={this.onPreviousMonth}
                                        >
                                            <img className="monthyearpicker__navigate-button-icon" src={AngleUpIcon} />
                                        </span>
                                        <span className="monthyearpicker__item monthyearpicker__item--faded">
                                            {t(`months.${this.state.previousMonth}`)}
                                        </span>
                                        <span className="monthyearpicker__item monthyearpicker__item--selected">
                                            {t(`months.${this.state.month}`)}
                                        </span>
                                        <span className="monthyearpicker__item monthyearpicker__item--faded">
                                            {t(`months.${this.state.nextMonth}`)}
                                        </span>
                                        <span className="monthyearpicker__navigate-button" onClick={this.onNextMonth}>
                                            <img
                                                className="monthyearpicker__navigate-button-icon"
                                                src={AngleDownIcon}
                                            />
                                        </span>
                                    </main>
                                    <footer className="monthyearpicker__selector-buttons">
                                        <button
                                            className="monthyearpicker__button"
                                            onClick={this.onMonthsSelectorClick}
                                        >
                                            Suivant
                                        </button>
                                    </footer>
                                </div>
                            )}
                            {!this.state.monthSelector && (
                                <div className="monthyearpicker__selector" onWheel={this.onYearsWheel}>
                                    <header className="monthyearpicker__selector-header">{t(`date.year`)}</header>
                                    <main className="monthyearpicker__selector-content">
                                        <span
                                            className="monthyearpicker__navigate-button"
                                            onClick={this.onPreviousYear}
                                        >
                                            <img className="monthyearpicker__navigate-button-icon" src={AngleUpIcon} />
                                        </span>
                                        <span className="monthyearpicker__item monthyearpicker__item--faded">
                                            {this.state.previousYear}
                                        </span>
                                        <span className="monthyearpicker__item monthyearpicker__item--selected">
                                            {this.state.year}
                                        </span>
                                        <span className="monthyearpicker__item monthyearpicker__item--faded">
                                            {this.state.nextYear}
                                        </span>
                                        <span className="monthyearpicker__navigate-button" onClick={this.onNextYear}>
                                            <img
                                                className="monthyearpicker__navigate-button-icon"
                                                src={AngleDownIcon}
                                            />
                                        </span>
                                    </main>
                                    <footer className="monthyearpicker__selector-buttons">
                                        <button className="monthyearpicker__button" onClick={this.onClosePopupClick}>
                                            Suivant
                                        </button>
                                    </footer>
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
