import "./Month.css";
import { Component } from "react";
import DayLine from "../dayline/DayLine";
import SettingsService from "../services/SettingsService";
class Month extends Component {
    constructor(props) {
        super(props);

        this.state = {
            days: [],
            settings: {}
        };
    }

    static getDerivedStateFromProps(props) {
        const settingsService = props.settingsService || new SettingsService();

        const days = [];
        if (props.date) {
            let day = new Date(props.date);
            while (day.getMonth() === props.date.getMonth()) {
                days.push(day);
                day = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1);
            }
        }
        return {
            days: days,
            settings: settingsService.get()
        };
    }

    render() {
        return (
            <div className="month">
                {this.state.days.map((day) => (
                    <DayLine key={day} day={day} />
                ))}
            </div>
        );
    }
}

export default Month;
