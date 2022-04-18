import "./App.css";
import { Component, Fragment } from "react";
import MonthYearPicker from "./monthyearpicker/MonthYearPicker";
import Month from "./month/Month";

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
                </header>
                <main>
                    <Month date={this.state?.date} />
                </main>
            </Fragment>
        );
    }
}

export default App;
