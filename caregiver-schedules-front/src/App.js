import "./App.css";
import { Component, Fragment } from "react";
import MonthYearPicker from "./monthyearpicker/MonthYearPicker";

class App extends Component {
    onDateChange = (date) => {
        this.setState(() => ({
            date: date
        }));
    };
    render() {
        return (
            <Fragment>
                <header>
                    <MonthYearPicker onChange={this.onDateChange} />
                    <p>{this.state?.date.toString()}</p>
                </header>
            </Fragment>
        );
    }
}

export default App;
