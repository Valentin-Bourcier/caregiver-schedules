import "./DayLine.css";
import { Component, Fragment } from "react";
import { withTranslation } from "react-i18next";

class DayLine extends Component {
    render() {
        const t = this.props.t;
        return (
            <div className="dayline">
                <div className="dayline__date">
                    <div className="dayline__date-day">{t(`days.${this.props.day.getDay()}`)}</div>
                    <div className="dayline__date-day-number">{this.props.day.getDate()} </div>
                </div>
            </div>
        );
    }
}

export default withTranslation("dates")(DayLine);
