import "./DayLine.css";
import { Component } from "react";
import { withTranslation } from "react-i18next";

class DayLine extends Component {
    render() {
        const t = this.props.t;
        return (
            <div>
                {t(`days.${this.props.day.getDay()}`)} {this.props.day.getDate()}{" "}
            </div>
        );
    }
}

export default withTranslation("dates")(DayLine);
