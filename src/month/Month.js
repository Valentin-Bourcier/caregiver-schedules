import "./Month.css";
import { Component } from "react";
import DayLine from "../dayline/DayLine";

class Month extends Component {
    constructor(props) {
        super(props);

        this.state = {
            days: []
        };
    }

    static getDerivedStateFromProps(props) {
        const days = [];
        if (props.date) {
            let day = new Date(props.date);
            while (day.getMonth() === props.date.getMonth()) {
                days.push(day);
                day = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1);
            }
        }
        return {
            days: days
        };
    }

    render() {
        return (
            <div className="month">
                {this.state.days.map((day) => (
                    <DayLine day={day} />
                ))}
            </div>
        );
    }
}

export default Month;
