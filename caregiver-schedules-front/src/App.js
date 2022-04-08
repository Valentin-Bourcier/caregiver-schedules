import "./App.css";
import { Component } from "react";
import MonthYearPicker from "./monthyearpicker/MonthYearPicker";

class App extends Component {
    constructor(props) {
        super(props);

        this.onDateChange = this.onDateChange.bind(this);
    }

    onDateChange(date) {
        this.setState(() => ({
            date: date
        }));
    }
    render() {
        return (
            <header>
                <MonthYearPicker onChange={this.onDateChange} />
                <p>{this.state?.date.toString()}</p>
            </header>
        );
    }
}

export default App;
